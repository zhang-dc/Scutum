import Vue from 'vue'
import Router from 'vue-router'
import Challenge from './pages/challenge/challenge.vue'
import ChallengeList from './pages/challenge/challenge-list.vue'
import EditChallenge from './pages/challenge/edit-challenge.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/challenge',
      component: Challenge,
      children: [
        {
          path: '',
          component: ChallengeList,
        },
        {
          path: 'edit',
          component: EditChallenge,
        },
      ],
    },
  ],
})
