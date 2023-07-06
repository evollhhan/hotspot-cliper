import { Loader } from './loader'

export class ImgLoader extends Loader {
  /**
   * @param source
   */
  static test (source: string | HTMLImageElement) {
    return typeof source === 'string' || source instanceof HTMLImageElement
  }

  /**
   * image cache.
   */
  img?: HTMLImageElement

  /**
   * source cache.
   */
  cache?: string | HTMLImageElement

  /**
   * @param source
   */
  async load () {
    const source = this.root.options.maskSource as string | HTMLImageElement
    const clipped = this.root.options.clipped

    if (!this.img || this.cache !== source) {
      if (typeof source === 'string') {
        // cache image
        this.img = await this.loadImage(source)
      } else {
        // make sure ths img is loaded
        this.img = source
      }

      this.cache = source
    }

    const { width, height } = this.root.getSize({
      width: this.img.naturalWidth,
      height: this.img.naturalHeight
    })

    if (clipped) {
      this.root.applyStyle(this.img.src)
    }

    return {
      target: this.img,
      width,
      height
    }
  }

  /**
   * Load image
   * @param src image url
   */
  loadImage (src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }
}
