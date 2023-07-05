export default function (cvs?: HTMLCanvasElement) {
  cvs = cvs || document.createElement('canvas')
  const ctx = cvs.getContext('2d')!
  cvs.width = 1366
  cvs.height = 915
  const grad = ctx.createLinearGradient(0, 0, 0, cvs.height)
  grad.addColorStop(0, 'rgba(0, 0, 0, 1)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, cvs.width, cvs.height)
  ctx.fillStyle = '#fff'
  ctx.font = '32px sans-serif'
  ctx.fillText('alpha: 255', 24, 48)
  ctx.fillStyle = '#000'
  ctx.fillText('alpha: 0', 24, cvs.height - 48)

  return cvs.toDataURL()
}