<template lang="pug">
    VDialog(
      v-model="dialog"
      max-width="320"
    )
      VCard
        VCardTitle.headline {{ title }}
        VCardText.text {{ text }}
        VCardActions
          VSpacer
          VBtn(
            color="green darken-1"
            text
            @click="dialog = false"
          ) Close
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class ErrorDialog extends Vue {
  @PropSync('show', { type: Boolean, default: false })
  public dialog!: boolean
  @Prop(String)
  public title!: string
  @Prop(String)
  public text!: string
}
</script>

<style lang="stylus" scoped>

</style>