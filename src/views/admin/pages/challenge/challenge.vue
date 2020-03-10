<template lang="pug">
div.challenge-container
  router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Challenges extends Vue {}
</script>

<style lang="stylus" scoped>

</style>