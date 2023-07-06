import { Loader } from './loader'

export class VideoLoader extends Loader {
  /**
   * @param source
   */
  static test (source: string | HTMLImageElement) {
    return source instanceof HTMLVideoElement
  }

  isPlaying = false

  async load () {
    const source = this.root.options.maskSource as HTMLVideoElement

    const { width, height } = this.root.getSize({
      width: source.videoWidth,
      height: source.videoHeight
    })

    // bind video events
    let fps = 1000 / 60 // current render in 60fps
    let now = Date.now()
    let then = now

    const render = () => {
      if (!this.isPlaying) {
        return
      }

      now = Date.now()
      if (now - then > fps) {
        this.root.update()
        then = now
      }

      requestAnimationFrame(render)
    }

    source.addEventListener('play', () => {
      this.isPlaying = true
      render()
    })

    source.addEventListener('pause', () => {
      this.isPlaying = false
    })

    return {
      target: source,
      width,
      height
    }
  }
}
