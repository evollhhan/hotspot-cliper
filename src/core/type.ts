export interface ColorGroup {
  /**
   * Color value [r, g, b]
   */
  color: number[]
  /**
   * Payload
   */
  data: any
}

export interface TouchEvent {
  /**
   * Whether the point is in the clip area
   */
  touched: boolean
  /**
   * Payload
   */
  data: any
}

export type MaskSource = string | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

export interface Size {
  width: number
  height: number
}

export interface SourceNode extends Size {
  /**
   * Mask Source
   */
  target: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
}

/**
 * OneClip Options
 */
export interface OneClipOptions {
  /**
   * The parent element of the element to be clipped
   */
  wrapper: HTMLElement
  /**
   * The mask source. Can be a url, image element, video element or canvas element.
   */
  maskSource: MaskSource
  /**
   * The size of the mask image. default 'fill'. Fill will stretch the image to fit the wrapper element.
   */
  maskSize?: 'contain' | 'cover' | 'fill'
  /**
   * Whether to clip the wrapper element with given image. default false
   */
  clipped?: boolean
  /**
   * Normalized alpha value of valid pointer event detection. default 0.8
   */
  threshold?: number
  /**
   * If a color group is specified, the pointer event detection will be valid only when the color of the pixel is in the color group.
   */
  group?: ColorGroup[]
}
