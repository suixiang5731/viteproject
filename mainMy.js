import mode2 from './mode2.js'
import mode from './ts1.ts'
import './css/test.css'
// import './css/lesstest.less'
import img from "./img/top1.png"
const img1 = new Image()
img1.src = img
console.log(mode)
console.log(mode2)
console.log(1)

document.getElementById("app").append(img1)