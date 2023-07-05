export default function (cvs?: HTMLCanvasElement) {
  cvs = cvs || document.createElement('canvas')
  const ctx = cvs.getContext('2d')!
  cvs.width = 1366
  cvs.height = 915
  ctx.fillStyle = '#000'
  ctx.fillStyle = '#000'
  ctx.font = 'bold 96px Arial, sans-serif'
  ctx.save()
  ctx.translate(cvs.width / 2, cvs.height / 2)
  const text = 'HELLO WORLD'
  const size = ctx.measureText(text)
  ctx.fillText(text, -size.width / 2, 0)
  ctx.fill()
  ctx.restore()

  return cvs.toDataURL()
}