<template lang="pug">
  Base
    div.page Login
    VTextField(label="User"
                hint="Input username or email"
                v-model="usernameOrEmail"
                :rules="[rules.required]")
    VTextField(label="Password"
                hint="Input password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required]"
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
  usernameOrEmail: string = ''
  password: string = ''
  showPassword: boolean = false
  rules: any = {
    required: (value: string) => required(value) || 'This field is required.',
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