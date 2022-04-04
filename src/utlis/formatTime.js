export function formatTime(times) {
  const date = new Date(times)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份
  const day = date.getDate() // 日
  const hour = function() { // 获取小时
    return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }
  const minute = function() { // 获取分钟
    return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }

  const second = function() { // 获取秒数
    return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }
  return year + '-' + month + '-' + day + ' ' + hour() + ':' + minute() + ':' + second()
}
