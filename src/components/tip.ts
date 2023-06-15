/**
 * Show a tip for a while.
 * @param msg tip message
 * @param duration duration in ms
 */
export default function (msg: string, duration = 3200) {
  const div = document.createElement('div')
  div.innerHTML = msg
  div.className = 'tip'
  document.body.appendChild(div)
  setTimeout(() => {
    div.classList.add('hide')
    setTimeout(() => {
      div.remove()
    }, 320)
  }, duration + 300)
}
