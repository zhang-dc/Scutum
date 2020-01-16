<template lang="pug">
div.login-container
  form.form
    div Login
    VTextField(color="primary" label="User" hint="Input username or Email")
    VTextField(color="primary" label="Password" hint="Input password")
    VBtn(tile outlined color="primary") Login
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Login extends Vue {
  usernameOrEmail: string
  password: string

  constructor() {
    super()
    this.usernameOrEmail = ''
    this.password = ''
  }
}
</script>

<style lang="stylus" scoped>
.login-container
  &:first-child
    display flex
    flex-direction row
    justify-content center
  .form
    width 360px
    margin 12vh auto 0
    &:first-child
      font-size 32px
</style>