<template lang="pug">
div.welcome-container
  a(href="/")
    img.logo(:src="require('@/assets/scutum.svg')")
  p Welcome to Scutum!
  p This is a docker based network security contest platform providing CTF & AWD challenges.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Welcome extends Vue {

}
</script>

<style lang="stylus" scoped>
.welcome-container
  display flex
  flex-direction column
  align-items center
  font-size 18px
  .logo
    margin 6vh 0 20px
    display block
    width 360px
  p
    margin 8px 0
</style>
