const TEMPLATE =
  `
(function () {
  function ready(cb) {
    if (document.readyState != 'loading') {
      cb()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback)
    }
  }

  ready(function () {
    var div = document.createElement('div')
    div.style.height = '0px'
    div.style.width = '0px'
    div.style.position = 'absolute'
    div.style.overflow = 'hidden'
    div.setAttribute('aria-hidden', 'true')
    div.innerHTML = __SVG__
    if (document.body.firstChild) {
      document.body.insertBefore(div, document.body.firstChild);
    } else {
      document.body.appendChild(div);
    }
  })
})()
`.trim() + '\n'

export function generateJavaScriptCode(symbols: string[]) {
  return TEMPLATE.replace(
    '__SVG__',
    JSON.stringify(['<svg>', ...symbols, '</svg>'].join(''))
  )
}
