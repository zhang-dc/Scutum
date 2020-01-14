<template lang="pug">
  div#app
    NavBar(:tabs="tabs")
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar, { NavBarTab } from '~/components/navbar.vue'

@Component({
  components: { NavBar },
})
export default class Index extends Vue {
  public tabs: NavBarTab[]

  constructor() {
    super()
    this.tabs = [
      {
        name: 'Settings',
        url: '/setting/',
      }, {
        name: 'Teams',
        url: '/team/',
      }, {
        name: 'Scoreboard',
        url: '/score/',
      }, {
        name: 'Challenges',
        url: '/challenge/',
      }, {
        name: 'Contests',
        url: '/contest/',
      },
    ]
    if(this.$store.state.user) {
      this.tabs.splice(1, 0, {
        name: 'Profile',
        url: `/user/${this.$store.state.user}`,
      })
    }
  }
}
</script>

<style lang="stylus">
body
  margin 0
p
  margin 0
#app
  font-family "Helvetica Neue",Helvetica,Arial,sans-serif,"Hiragino Sans GB","华文细黑","STHeiti","微软雅黑","Microsoft YaHei",SimHei
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
</style>
