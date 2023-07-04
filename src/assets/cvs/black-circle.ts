export default function () {
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext('2d')!
  cvs.width = 1366
  cvs.height = 915
  ctx.fillStyle = '#000'
  ctx.save()
  ctx.translate(cvs.width / 2, cvs.height / 2)
  ctx.beginPath()
  ctx.arc(0, 0, cvs.height / 3, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  return new Promise<string>((resolve) => {
    cvs.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!))
    })
  })
}