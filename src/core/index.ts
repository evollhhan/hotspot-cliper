/**
 * HotspotClipper Options
 */
interface HotspotClipperOptions {
  /**
   * The parent element of the element to be clipped
   */
  wrapper: HTMLElement
  /**
   * The url of the mask image
   */
  maskImageUrl: string
  /**
   * Whether to mask the wrapper element. default false
   */
  willMaskWrapper?: boolean
  /**
   * Normalized alpha value of valid pointer event detection. default 0.8
   */
  effectAlpha?: number
  /**
   * The size of the mask image. default 'fill'. Fill will stretch the image to fit the wrapper element.
   */
  maskSize?: 'contain' | 'cover' | 'fill'
}

export class HotspotClipper {
  /**
   * Options
   */
  options: Required<HotspotClipperOptions>

  /**
   * Offscreen canvas
   */
  cvs = document.createElement('canvas')

  /**
   * Whether the instance is loaded
   */
  loaded = false

  /**
   * Canvas context
   */
  get ctx () {
    return this.cvs.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
  }

  /**
   * Mask image
   */
  maskImage: HTMLImageElement | undefined

  constructor (options: HotspotClipperOptions) {
    this.options = {
      willMaskWrapper: false,
      effectAlpha: 0.8,
      maskSize: 'fill',
      ...options
    }
    this.load()
  }

  async load () {
    const { ctx, options } = this
    const { wrapper, willMaskWrapper, effectAlpha } = options
    const validAlpha = Math.max(0, Math.floor(255 * Math.min(effectAlpha, 1)))

    if (willMaskWrapper) {
      this.applyStyle()
    }

    // resets
    this.maskImage = undefined

    // render canvas
    await this.update()

    // check if already loaded
    if (this.loaded) {
      return
    }

    // Bind wrapper click events
    wrapper.addEventListener('click', (e: MouseEvent) => {
      const { offsetX, offsetY } = e
      const { data } = ctx.getImageData(offsetX, offsetY, 1, 1)
      if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] > validAlpha) {
        console.log('clicked!')
      }
    })

    this.loaded = true
  }

  /**
   * Load mask image
   * @param src image url
   */
  loadMaskImage (src: string) {
    if (this.maskImage) {
      return Promise.resolve(this.maskImage)
    }

    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.maskImage = img
        resolve(img)
      }
      img.onerror = reject
      img.src = src
    })
  }

  /**
   * Update mask image and hotspots area
   */
  async update () {
    const { cvs, ctx, options } = this
    const { maskImageUrl, wrapper, maskSize } = options

    // preload mask image
    const img = await this.loadMaskImage(maskImageUrl)

    let width = 0 // mask image width
    let height = 0 // mask image height

    // resize canvas to fit wrapper
    const size = wrapper.getBoundingClientRect()
    const scaleWidth = size.width / img.naturalWidth
    const scaleHeight = size.height / img.naturalHeight

    // calculate mask image size
    switch (maskSize) {
      case 'contain': {
        const scale = Math.min(scaleWidth, scaleHeight)
        width = cvs.width = img.naturalWidth * scale
        height = cvs.height = img.naturalHeight * scale
        break
      }
      case 'cover': {
        const scale = Math.max(scaleWidth, scaleHeight)
        width = cvs.width = img.naturalWidth * scale
        height = cvs.height = img.naturalHeight * scale
        break
      }
      default: {
        width = cvs.width = size.width
        height = cvs.height = size.height
      }
    }

    // draw mask image
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.drawImage(img, 0, 0, width, height)
    ctx.globalCompositeOperation = 'source-in'
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.rect(0, 0, cvs.width, cvs.height)
    ctx.fill()
    ctx.closePath()
  }

  /**
   * Set mask style
   */
  applyStyle () {
    const { maskImageUrl, maskSize, wrapper } = this.options

    const stylesheet: Record<string, any> = {
      maskImage: `url(${maskImageUrl})`,
      maskSize: maskSize === 'fill' ? '100% 100%' : maskSize,
      maskRepeat: 'no-repeat',
    }

    Object.keys(stylesheet).forEach((prop: string) => {
      const style = wrapper.style as any
      style[prop] = stylesheet[prop]
      style[`webkit${prop[0].toUpperCase()}${prop.slice(1)}`] = stylesheet[prop]
    })
  }
}
