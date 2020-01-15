<template lang="pug">
  div#app
    div#nav
      router-link(to="/")
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class AdminIndex extends Vue {

}
</script>

<style lang="stylus">
body
  margin 0
#app
  font-family "Helvetica Neue",Helvetica,Arial,sans-serif,"Hiragino Sans GB","华文细黑","STHeiti","微软雅黑","Microsoft YaHei",SimHei
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
</style>
