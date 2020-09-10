function addStylesheetRules(rules) {
  let styleEl = document.createElement('style'),
    styleSheet;
  document.head.appendChild(styleEl);

  // 获取样式
  styleSheet = styleEl.sheet;
  // 插入样式
  for (var i = 0; i < rules.length; i++) {
    styleSheet.insertRule(rules[i], styleSheet.cssRules.length); //后面一个参数表示插入位置的索引
  }
}