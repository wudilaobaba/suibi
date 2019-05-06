// ---------------001-------------
let p = 600
export default p
//一个js文件中只可以导出一个export default

// 引入：(不必引入原始值，写xxxx也可以)
//import xxxx from './01.js' 打印的xxxx为p的值

// --------------002--------------

export const t = 900
export function g() {
  console.log(4444);
}
//一个js文件中可以导出多个非default,引入的时候一定要写真实的非default导入的变量名********

// 引入：(必须引入原始值)
//import {t, g} from './01.js'

// --------------003--------------
//import引入一个node_modules包的方法：
// 引入：
//import xx from '包名'
