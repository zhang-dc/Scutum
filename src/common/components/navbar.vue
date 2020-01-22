<template lang="pug">
div.navbar-container
  a(href="/#/")
    img.logo(:src="require('@/assets/scutum.svg')")
  div.nav
    router-link.links(:class="{active: current == index}"
                      v-for="(tab,index) in tabs"
                      :to="tab.url"
                      :key="`tab${index}`"
                      @click="goto(index)")
      div {{tab.name}}
  div.user
    div.name(v-if="user") {{ username }}
    router-link.login(v-else to="/login") Login
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import User from '~/models/user'


class NavBarTab {
  public name: string
  public url: string
  constructor(name: string, url: string) {
    this.name = name
    this.url = url
  }
}
export { NavBarTab }

@Component({
  components: {},
})
export default class NavBar extends Vue {
  @Prop()
  public tabs!: NavBarTab[]
  @Prop()
  public user!: User
  public current: number

  constructor() {
    super()
    this.current = -1
  }
  public get username(): string {
    return this.user ? this.user.username : ''
  }
  public goto(page: number): void {
    this.current = page
    // this.$router.push(this.tabs[page].url)
  }
}
</script>

<style lang="stylus" scoped>
$navbar-padding = 16px
$logo-font-size = 36px
$link-font-size = 16px
.navbar-container
  display flex
  align-items center
  position relative
  // width calc(100vw - $navbar-padding * 2)
  height 72px
  padding 0 $navbar-padding
  background $background-color
  color $primary-dark
  font-size $link-font-size
  user-select none
  .logo
    font-size $logo-font-size
    display block
    width 108px
  .nav
    display flex
    flex-direction row-reverse
    flex-grow 1
    margin 0 20px
  .links
    margin 20px 8px 0
  .links.router-link-active, .login.router-link-active
    color $primary-light
  .links, .login
    color  $primary-dark
    text-decoration none
    transition all .25s
    &:hover
      color $primary-light
  .user
    margin 20px 8px 0
</style>