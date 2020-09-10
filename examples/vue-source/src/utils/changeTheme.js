import axios from 'axios'
// 发送请求获取默认的CSS样式，并返回样式字符串
function getCSSString(url, styleId) {
  const oldStyle = document.getElementById(styleId)
  if (oldStyle) {
    return oldStyle.innerText
  }
  return axios.get(url).then(res => {
    // 去掉字体
    return Promise.resolve(res.data.replace(/@font-face{[^}]+}/, ''))
  })
}
// 使用正则表达式将匹配的样式修改(oldTheme、newTheme本质是一个颜色#2BF511)
// 将Element默认的样式中所以使用了相同颜色的地方替换
function updateStyle(cssString, oldTheme, newTheme) {
  cssString = cssString.replace(new RegExp(oldTheme, 'ig'), newTheme)
  return cssString
}
// 删掉旧的样式
function destoryStyle(styleId) {
  const node = document.getElementById(styleId)
  if (node) {
    node.parentElement.removeChild(node)
  }
}
// 追加新的样式并设置替换后的样式
function setStyle(id, newStyle) {
  let styleTag = document.getElementById(id)
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.setAttribute('id', id)
    document.head.appendChild(styleTag)
  }
  styleTag.innerText = newStyle
}

export default {
  getCSSString,
  updateStyle,
  destoryStyle,
  setStyle
}