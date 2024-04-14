import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mode from '../ts1.ts'
import '../css/test.css'
// import './css/lesstest.less'
import img from "../img/top1.png"
// import mode2 from '../mode2.js'
// console.log(mode2)
import('../mode2.js').then(res => {
    console.log(res.default)
})
const img1 = new Image()
img1.src = img
console.log(mode)
console.log(1)

document.getElementById("app").append(img1)

createApp(App).mount('#app')
