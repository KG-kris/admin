// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//1.引入reset.css 
import "./assets/css/reset.css"

//2.处理公共组件
import commonComponents from "./components/index"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//3.处理过滤器
import filters from "./filters"
for(let i in filters){
  Vue.filter(i,filters[i])
}
//4.axios

//5.vuex
import store from "./store"

//6.element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

//图片前缀
Vue.prototype.$imgPre="http://localhost:3000"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
