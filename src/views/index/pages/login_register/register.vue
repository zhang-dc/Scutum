<template lang="pug">
  Base
    div.page Register
    VTextField(label="Username"
                hint="Input username"
                v-model="username"
                :rules="[rules.required]")
    VTextField(label="Email"
                hint="Input email"
                type="email"
                v-model="email"
                :rules="[rules.required, rules.invalidEmail]")
    VTextField(label="Password"
                hint="Password should contain at least 8 characters (at least one letter, one number)<br/>and only #?!@$%^&*- are allowed"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.invalidLength, rules.invalidPassword]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword")
    div.buttons
      VBtn.btn(tile color="primary" @click="register") Register
      VBtn.btn(tile outlined color="primary" href="/#/login") Login
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Base from './base.vue'
import { limitLength, required, validatePassword, validateEmail } from '~/util/validators'
@Component({
  components: { Base },
})
export default class Login extends Vue {
  private username: string = ''
  private email: string = ''
  private password: string = ''
  private rules: any = {
    required: (value: string) => required(value) || 'This field is required.',
    invalidLength: (value: string) => limitLength(8, 32)(value) || 'Length is limited between 8, 32.',
    invalidEmail: (value: string) => validateEmail(value) || 'Email address is invalid.',
    invalidPassword: (value: string) => validatePassword(value) || 'Password should contain at least 8 characters (at least one letter, one number), and only #?!@$%^&*- are allowed',
  }
  private showPassword: boolean = false

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