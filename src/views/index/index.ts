import Vue from 'vue'
import Index from './index.vue'
import router from './router'
import store from './store'

new Vue({
    router,
    store,
    render: (h) => h(Index),
  }).$mount('#app')
