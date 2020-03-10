<template lang="pug">
div.login-container
  form.form
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Base extends Vue {

}
</script>

<style lang="stylus" scoped>
.login-container
  &:first-child
    display flex
    flex-direction row
    justify-content center
  .form
    max-width 420px
    margin 12vh auto 0
    padding 48px 24px
    border $primary-dark 1px solid
</style>