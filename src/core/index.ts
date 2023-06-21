interface ColorGroup {
  /**
   * Color value [r, g, b]
   */
  color: number[]
  /**
   * Payload
   */
  data: any
}

interface TouchEvent {
  /**
   * Whether the point is in the clip area
   */
  touched: boolean
  /**
   * Payload
   */
  data: any
}

/**
 * OneClip Options
 */
interface OneClipOptions {
  /**
   * The parent element of the element to be clipped
   */
  wrapper: HTMLElement
  /**
   * The url of the mask image
   */
  maskImageUrl: string
  /**
   * Whether to clip the wrapper element with given image. default false
   */
  clipped?: boolean
  /**
   * The size of the mask image. default 'fill'. Fill will stretch the image to fit the wrapper element.
   */
  maskSize?: 'contain' | 'cover' | 'fill'
  /**
   * Normalized alpha value of valid pointer event detection. default 0.8
   */
  threshold?: number
  /**
   * If a color group is specified, the pointer event detection will be valid only when the color of the pixel is in the color group.
   */
  group?: ColorGroup[]
}

export class OneClip {
  /**
   * Options
   */
  options: Required<OneClipOptions>

  /**
   * Offscreen canvas
   */
  cvs = document.createElement('canvas')

  /**
   * Alpha value of valid pointer event detection. 0-255
   */
  effectAlpha = 0

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

  constructor (options: OneClipOptions) {
    this.options = {
      clipped: false,
      threshold: 0.9,
      maskSize: 'fill',
      group: [],
      ...options
    }
    this.load()
  }

  async load () {
    const { options } = this
    const { threshold } = options
    this.effectAlpha = Math.max(0, Math.floor(255 * Math.min(threshold, 1)))

    // render canvas
    await this.update(true)
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
   * Update mask image and clip area
   * @param reload reload mask image
   */
  async update (reload = false) {
    const { cvs, ctx, options } = this
    const { maskImageUrl, wrapper, maskSize, clipped, group } = options

    // clear mask image cache if reload
    if (reload) {
      this.maskImage = undefined
    }

    // preload mask image
    const img = await this.loadMaskImage(maskImageUrl)

    // reset style
    if (reload && clipped) {
      this.applyStyle()
    }

    let width = 0 // mask image width
    let height = 0 // mask image height

    // resize canvas to fit wrapper
    const size = wrapper.getBoundingClientRect()
    const scaleWidth = size.width / img.naturalWidth
    const scaleHeight = size.height / img.naturalHeight

    // resize canvas
    cvs.width = size.width
    cvs.height = size.height

    // calculate mask image size
    switch (maskSize) {
      case 'contain': {
        const scale = Math.min(scaleWidth, scaleHeight)
        width = img.naturalWidth * scale
        height = img.naturalHeight * scale
        break
      }
      case 'cover': {
        const scale = Math.max(scaleWidth, scaleHeight)
        width = img.naturalWidth * scale
        height = img.naturalHeight * scale
        break
      }
      default: {
        width = size.width
        height = size.height
      }
    }

    // draw mask image
    const x = (cvs.width - width) / 2
    const y = (cvs.height - height) / 2
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.drawImage(img, x, y, width, height)

    if (!group.length) {
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.rect(0, 0, cvs.width, cvs.height)
      ctx.fill()
      ctx.closePath()
    }
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
      maskPosition: 'center'
    }

    Object.keys(stylesheet).forEach((prop: string) => {
      const style = wrapper.style as any
      style[prop] = stylesheet[prop]
      style[`webkit${prop[0].toUpperCase()}${prop.slice(1)}`] = stylesheet[prop]
    })
  }
}
