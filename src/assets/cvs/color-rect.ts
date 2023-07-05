export default function (cvs?: HTMLCanvasElement) {
  cvs = cvs || document.createElement('canvas')
  const ctx = cvs.getContext('2d')!
  cvs.width = 1366
  cvs.height = 915
  const w = cvs.width / 3
  ctx.fillStyle = 'rgba(255, 0, 0, 1)'
  ctx.fillRect(0, 0, w, cvs.height)
  ctx.fillStyle = 'rgba(0, 255, 0, 1)'
  ctx.fillRect(w, 0, w, cvs.height)
  ctx.fillStyle = 'rgba(0, 0, 255, 1)'
  ctx.fillRect(w * 2, 0, w, cvs.height)

  return cvs.toDataURL()
}