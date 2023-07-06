import type { OneClip } from './index'
import type { SourceNode } from './type'

export abstract class Loader {
  static test (source: any) {
    return false
  }

  /**
   * OneClip instance
   */
  root: OneClip

  constructor (root: OneClip) {
    this.root = root
  }

  abstract load (): Promise<SourceNode>
}
