interface HotspotClipperOptions {
  wrapper: HTMLElement
  maskImageUrl: string
}

export class HotspotClipper {
  options: HotspotClipperOptions

  cvs = document.createElement('canvas')

  constructor (options: HotspotClipperOptions) {
    this.options = options;
    this.load()
  }

  async load () {
    const { cvs, options } = this
    const { maskImageUrl, wrapper } = options
    const img = await this.loadImage(maskImageUrl)
    const size = wrapper.getBoundingClientRect()
    const scale = size.width / img.naturalWidth
    const ctx = cvs.getContext('2d', { willReadFrequently: true })!
    cvs.width = img.naturalWidth * scale
    cvs.height = img.naturalHeight * scale
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
    ctx.globalCompositeOperation = 'source-in'
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.rect(0, 0, cvs.width, cvs.height)
    ctx.fill()
    ctx.closePath()

    cvs.style.display = 'block'
    cvs.style.width = '100%'
    cvs.style.height = '100%'

    wrapper.addEventListener('click', (e: MouseEvent) => {
      const { offsetX, offsetY } = e
      const { data } = ctx.getImageData(offsetX, offsetY, 1, 1)
      if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 255) {
        console.log('clicked!')
      }
    })
  }

  loadImage (src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }
}
