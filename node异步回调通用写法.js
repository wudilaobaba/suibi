const fs = require('fs')
let yyy = (callback) => {
  fs.readFile('./02.js', 'utf8', (err, data) => {
    if (err) {
      callback('第一步没有找到文件', null) // 根据函数yyy调用时，callback函数需要接收几个参数，那这里的callback就要接收几个参数，并结合具体情况来判断哪个参数应设为null
      return
    } else {
      callback(null, data) // 根据函数yyy调用时，callback函数需要接收几个参数，那这里的callback就要接收几个参数，并结合具体情况来判断哪个参数应设为null
      fs.stat('./00002.js', (err, stats) => {
        if (err) {
          callback('第二步没有找到文件', null)
          return
        } else {
          callback(null, stats.isDirectory())
        }
      })
    }
  })
}

//上面yyy函数的调用
yyy((err, data) => {
  if (err) {
    console.log('-------->', err);
  } else {
    console.log(data);
  }
})