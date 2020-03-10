<template lang="pug">
  div.challengelist-container
    VDataTable(
      :headers="headers"
      :items="challenges"
      :search="search"
    )
      template(v-slot:top)
        VToolbar(flat)
          VToolbarTitle Challenges
          VSpacer
          VTextField(
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            clearable
            single-line
            hide-details
          )
          VTooltip(bottom)
            template(v-slot:activator="{ on }")
              VIcon(v-on="on" @click="add") mdi-plus
            span Add a challenge
      template(v-slot:item._id="{ item }")
        span {{ item._id.slice(-8) }}
      template(v-slot:item.tags="{ item }")
        VChip.tags(v-for="tag in item.tags" :key="item.id + tag" outlined small color="primary") {{ tag }}
      template(v-slot:item.action="{ item, index }")
        div.actions
          VBtn.action(small tile outlined color="primary" @click="edit(item)")
            VIcon(left small) mdi-pencil
            span Edit
          VBtn.action(small tile outlined color="primary" @click="remove(index)")
            VIcon(left small) mdi-delete
            span Delete
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Challenge from '@/views/admin/models/challenge'
import axios from 'axios'
@Component({
  components: {},
})
export default class ChallengeList extends Vue {
  private headers = [
    {
      text: 'ID',
      align: 'left',
      sortable: false,
      value: '_id',
    }, {
      text: 'Challenge',
      align: 'left',
      sortable: false,
      value: 'title',
    }, {
      text: 'Tags',
      align: 'left',
      sortable: false,
      value: 'tags',
    }, {
      text: 'Action',
      align: 'center',
      sortable: false,
      value: 'action'
    },
  ]
  private challenges = []
  private pageSize: number = 20
  private search: string = ''
  private loading: boolean = false

  public add() {
    this.$router.push('edit')
  }

  public edit(item: Challenge) {
    this.$router.push({
      path: 'edit',
      query: {
        id: item._id,
      },
    })
  }

  public remove(index: number) {
    // TODO remove challenge
    setTimeout(() => this.challenges.splice(index, 1), 1000)
  }

  public created() {
    this.loading = true
    axios.get('/api/v1/challenge/list').then(resp => {
      this.challenges = resp.data
      this.challenges.forEach((challenge) => {
      })
      this.loading = false
    }).catch((resp) => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>
.challengelist-container
  min-height calc(100vh - 72px)
  margin 0 10vw
  .tags, .action
    margin 2px 4px
  .actions
    min-width 240px
</style>