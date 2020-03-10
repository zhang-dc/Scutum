<template lang="pug">
  Base
    div.page Login
    VTextField(label="User"
                hint="Input username or email"
                prepend-icon="mdi-account"
                v-model="usernameOrEmail"
                :rules="[rules.requireUser]")
    VTextField(label="Password"
                hint="Input password"
                prepend-icon="mdi-lock"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.requirePassword]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword")
    div.buttons
      VBtn.btn(tile outlined color="primary" href="/#/register") Register
      VBtn.btn(tile color="primary") Login
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Base from './base.vue'
import { required } from '~/util/validators'
@Component({
  components: { Base },
})
export default class Login extends Vue {
  private usernameOrEmail: string = ''
  private password: string = ''
  private showPassword: boolean = false
  private rules: any = {
    requireUser: (value: string) => required(value) || 'Username or email cannot be empty.',
    requirePassword: (value: string) => required(value) || 'Password cannot be empty.',
  }
  constructor() {
    super()
  }
}
</script>

<style lang="stylus" scoped>
  .page
    font-size 32px
  .buttons
    margin-top 32px
  .btn
    margin 8px
</style>