import type { TouchEvent, OneClipOptions, Size } from './type'
import { Loader } from './loader'
import { ImgLoader } from './img-loader'
import { VideoLoader } from './video-loader'

export class OneClip {
  /**
   * Loaders
   */
  static loaders: Array<typeof Loader> = [
    ImgLoader,
    VideoLoader
  ]

  /**
   * Offscreen canvas
   */
  readonly cvs = document.createElement('canvas')

  /**
   * Canvas context
   */
  get ctx () {
    return this.cvs.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
  }

  /**
   * Options
   */
  options!: Required<OneClipOptions>

  loader: Loader | undefined

  wrapperWidth = 0

  wrapperHeight = 0

  effectAlpha = 0

  /**
   * @param options
   */
  constructor (options: OneClipOptions) {
    this.setOptions(options)
    this.reload()
    this.resize()
    this.bindEvents()
    this.update()
  }

  bindEvents () {
    if (this.options.autoResize) {
      window.addEventListener('resize', () => {
        this.resize()
        this.update()
      })
    }
  }

  use (LoaderConstructor: typeof Loader) {
    OneClip.loaders.push(LoaderConstructor)
  }

  /**
   * @param options
   */
  setOptions (options: OneClipOptions) {
    this.options = {
      clipped: false,
      threshold: 0.9,
      maskSize: 'fill',
      group: [],
      autoResize: false,
      ...options
    }

    this.effectAlpha = Math.max(0, Math.floor(255 * Math.min(this.options.threshold, 1)))
  }

  reload () {
    const { maskSource } = this.options
    const Construct = OneClip.loaders.find(loader => loader.test(maskSource))
    if (Construct) {
      this.loader = new (Construct as any)(this)
    }
  }

  resize () {
    const { wrapper } = this.options
    const { width, height } = wrapper.getBoundingClientRect()
    this.wrapperWidth = width
    this.wrapperHeight = height
    this.cvs.width = width
    this.cvs.height = height
  }

  /**
   * Check if the point is in the clip area
   * @param x
   * @param y
   */
  isTouched (x: number, y: number) {
    const { group } = this.options
    const { data } = this.ctx.getImageData(x, y, 1, 1)
    const [r, g, b, a] = data

    const result: TouchEvent = {
      touched: false,
      data: null
    }

    if (group.length) {
      const target = group.find(({ color }) => r === color[0] && g === color[1] && b === color[2] && a > this.effectAlpha)
      if (target) {
        result.touched = true
        result.data = target.data
      }
    } else {
      result.touched = r === 0 && g === 0 && b === 0 && a > this.effectAlpha
    }

    return result
  }

  /**
   * Update mask image and clip area
   */
  async update () {
    const { cvs, ctx, options } = this
    const { group } = options

    if (!this.loader) {
      return
    }

    // preload mask source
    const { target, width, height } = await this.loader.load()

    // draw mask image
    const x = (cvs.width - width) / 2
    const y = (cvs.height - height) / 2
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.drawImage(target, x, y, width, height)

    if (!group.length) {
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.rect(0, 0, cvs.width, cvs.height)
      ctx.fill()
      ctx.closePath()
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  getSize (size: Size): Size {
    const { wrapperWidth, wrapperHeight, options } = this
    const { maskSize } = options
    const scaleWidth = wrapperWidth / size.width
    const scaleHeight = wrapperHeight / size.height
    let width = 0
    let height = 0
    switch (maskSize) {
      case 'contain': {
        const scale = Math.min(scaleWidth, scaleHeight)
        width = size.width * scale
        height = size.height * scale
        break
      }
      case 'cover': {
        const scale = Math.max(scaleWidth, scaleHeight)
        width = size.width * scale
        height = size.height * scale
        break
      }
      default: {
        width = wrapperWidth
        height = wrapperHeight
      }
    }

    return {
      width,
      height
    }
  }

  /**
   * Set mask style
   * @param src mask image url
   */
  applyStyle (src: string) {
    const { maskSize, wrapper } = this.options

    const stylesheet: Record<string, any> = {
      maskImage: `url(${src})`,
      maskSize: maskSize === 'fill' ? '100% 100%' : maskSize,
      maskRepeat: 'no-repeat',
      maskPosition: 'center'
    }

    Object.keys(stylesheet).forEach((prop: string) => {
      const style = wrapper.style as any
      style[prop] = stylesheet[prop]
      style[`webkit${prop[0].toUpperCase()}${prop.slice(1)}`] = stylesheet[prop]
    })
  }
}
