
export function validateMobile (val) {
  if (val) {
    val = val.replace(/[^\d]/g, '').substr(0, 10)
    if (val.length <= 4) {
      return val
    } else if (val.length <= 7) {
      val = val.replace(/(\d{3})(\d{0,4})/, '$1-$2')
    } else {
      val = val.replace(/(\d{4})(\d{0,3})(\d{0,3})/, '$1-$2-$3')
    }
    return val
  }
}
export function newTime () {
  const d = new Date()
  return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + (d.getDate() - 0)
}

export function formData (valve) {
  const dt = new Date(valve)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}年${m}月${d}日`
}
/* const mo = function (e) {
  // console.log(e.preventDefault())
  e.preventDefault()
}
export function stop () {
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止頁面劃動
}
export function move () {
  document.body.style.overflow = ''// 出現滾動條
  document.removeEventListener('touchmove', mo, false)
} */
export default {
  validateMobile,
  newTime,
  formData
}
