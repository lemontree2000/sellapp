export formatDate (date, fmt) {
  if (/(y+)/.text(fmt)) {
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+': date.getMouth() + 1,
    'd+': date.getDate(),
    'h+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace
    }
  }
};