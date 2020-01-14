import Vue from 'vue'
import Router from 'vue-router'
import Index from './index.vue'
import Welcome from './pages/welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome,
    },
    {
      path: '/challenge',
    },
  ],
})
