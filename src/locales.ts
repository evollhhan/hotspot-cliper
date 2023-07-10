import { Plugin } from 'vue'

const DICT = {
  zh: {
    Introduction: '介绍',
    IntroductDesc: [
      '在css中我们使用```clip-path```来裁剪目标元素的可视区域，同时区域外的部分不响应用户的交互行为，如点击、鼠标移动等。这个属性很方便，但它无法像```mask-image```属性那样，通过图像来作为运算对象。', 
      '同样的，使用```mask-image```设置蒙版的方式虽然也能达到类似的效果，但对于不可视的区域依然会响应用户的交互行为。',
      '为了既可以使用图像来裁剪对象，又能保证期望的交互效果，我设计了one-clip。',
    ],
    Initialize: '快速上手',
    Parameters: '参数',
    MaskSourceDesc: '定义一个遮罩源，可以是图片链接、Image元素、Canvas元素或者视频元素。',
    VideoTip: '使用视频作为遮罩源时，需要指定group参数用于识别点击区域。',
    ThresholdDesc: '当遮罩源的透明度大于该阈值时才会响应点击事件。该值的返回在0～1之间，对应透明度为0～255。',
    ClippedDesc: '是否需要裁剪图像，注意该参数不适用于视频遮罩源。',
    GroupDesc: '定义一个颜色数组，用于在同一个遮罩源上划分点击的区域范围。',
    Methods: '实例方法',
  },
  en: {
    Introduction: 'Introduction',
    IntroductDesc: [
      'In css, we use ```clip-path``` to clip the visible area of the target element, and the area outside the area does not respond to the user\'s interactive behavior, such as clicking, mouse movement, etc. This property is very convenient, but it cannot be used like ```mask-image``` property. As the operand.',
      'Similarly, although the use of ```mask-image``` to set the mask can also achieve similar effects, but the invisible area will still respond to the user\'s interactive behavior.',
      'In order to be able to use images to clip objects and ensure the expected interaction effect, I designed one-clip.',
    ],
    Initialize: 'Initialize',
    Parameters: 'Parameters',
    MaskSourceDesc: 'Define a mask source, which can be an image link, an Image element, a Canvas element, or a video element.',
    VideoTip: 'When using video as a mask source, you need to specify the group parameter to identify the click area.',
    ThresholdDesc: ' Only when the transparency of the mask source is greater than the threshold will the click event be responded. The return value of this value is between 0 and 1, corresponding to the transparency of 0 to 255.',
    ClippedDesc: 'Whether to clip the image, note that this parameter does not apply to video mask sources.',
    GroupDesc: 'Define a color array to divide the range of clicks on the same mask source.',
    Methods: 'Methods',
  },
} as Record<string, Record<string, string | string[]>>

/**
 * replace ```xxx``` to <code>xxx</code>
 * @param desc
 */
function parseDesc(desc: string) {
  return desc.replace(/```(.+?)```/g, '<code class="tag">$1</code>')
}

export default {
  install(app) {
    app.config.globalProperties.$t = (key: string) => {
      const lang = app.config.globalProperties.language || 'zh'
      const text = DICT[lang][key] || key
      if (Array.isArray(text)) {
        return text.map(value => `<p>${parseDesc(value)}</p>`).join('')
      } else {
        return parseDesc(text)
      }
    }  
  },
} as Plugin