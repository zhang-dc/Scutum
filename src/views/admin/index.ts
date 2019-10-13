import Vue from 'vue'
import Login from './index.vue'
import router from './router'
import store from './store'

new Vue({
    router,
    store,
    render: (h) => h(Login),
  }).$mount('#app')
