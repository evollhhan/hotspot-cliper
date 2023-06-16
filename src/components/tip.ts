/**
 * Show a tip for a while.
 * @param msg tip message
 * @param duration duration in ms
 * @param style tip style
 */
export default function (msg: string, duration = 1200, style: Partial<CSSStyleDeclaration> = {}) {
  const div = document.createElement('div')
  div.innerHTML = msg
  div.className = 'tip'
  Object.assign(div.style, style)
  document.body.appendChild(div)
  setTimeout(() => {
    div.classList.add('hide')
    setTimeout(() => {
      div.remove()
    }, 320)
  }, duration + 300)
}
