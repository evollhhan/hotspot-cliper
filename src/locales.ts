import { Plugin } from 'vue'

const DICT = {
  zh: {
    Initialize: '快速上手',
    Parameters: '参数',
    MaskSourceDesc: '定义一个遮罩源，可以是图片链接、Image元素、Canvas元素或者视频元素。',
    ThresholdDesc: '当遮罩源的透明度大于该阈值时才会响应点击事件。该值的返回在0～1之间，对应透明度为0～255。',
    ClippedDesc: '是否需要裁剪图像，注意该参数不适用于视频遮罩源。',
    GroupDesc: '定义一个颜色数组，用于在同一个遮罩源上划分点击的区域范围。',
  },
  en: {
    Initialize: 'Initialize',
    Parameters: 'Parameters',
    MaskSourceDesc: 'Define a mask source, which can be an image link, an Image element, a Canvas element, or a video element.',
    ThresholdDesc: ' Only when the transparency of the mask source is greater than the threshold will the click event be responded. The return value of this value is between 0 and 1, corresponding to the transparency of 0 to 255.',
    ClippedDesc: 'Whether to clip the image, note that this parameter does not apply to video mask sources.',
    GroupDesc: 'Define a color array to divide the range of clicks on the same mask source.',
  },
} as Record<string, Record<string, string>>

export default {
  install(app) {
    app.config.globalProperties.$t = (key: string) => {
      const lang = app.config.globalProperties.language || 'zh'
      return DICT[lang][key]
    }  
  },
} as Plugin