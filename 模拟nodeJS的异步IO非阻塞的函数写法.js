//判断是不是偶数：参数一定要传纯数字
let isOu = (n, callback) => {
  if (typeof n == 'number') {
    if (n % 2 == 0) {
      setTimeout(() => { //这里模拟异步I/O非阻塞 ,
        for (let i = 0; i <= 2000000000; i++) {
          //假设为这里在做 I/O 操作
          if (i == 2000000000) {
            console.log('ok');
          }
        }
        callback(null, '偶数')
      }, 0)
    } else {
      callback(null, '奇数')
    }
  } else {
    callback(new Error('错误,必须为数字'), null)
  }
}

console.time('xx')
isOu('454', (err, data) => {
  if (err) {
    console.log('------------', err);
  } else {
    console.log(data);
  }
})
console.log('我先执行了，不客气了');
console.timeEnd('xx')