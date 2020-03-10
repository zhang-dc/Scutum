<template lang="pug">
div.challenge-container
  VContainer(fluid)
    VRow(no-gutters)
      VCol.table(md="9" sm="9")
        VDataTable(
          :headers="headers"
          :items="challenges"
          :loading="loading"
          :page.sync="page"
          height="calc(100vh - 120px)"
          hide-default-footer
        )
          template(v-slot:item.tags="{ item }")
            VChip.tags(v-for="tag in item.tags" :key="item.id + tag" outlined small color="primary") {{ tag }}
          template(v-slot:item.solved="{ item }")
            span {{ item.solved }}
          template(v-slot:item.action="{ item, index }")
            VBtn.action(small tile outlined color="primary" @click="edit(item)") View
          template(v-slot:footer="{ props }")
            VRow(no-gutters align="center")
              VCol(md="1" offset="4")
                VBtn(text color="primary")
                  VIcon mdi-chevron-left
              VCol(md="1")
                VTextField.input-page(
                  v-model="page"
                  placeholder="Page"
                  hide-details
                  dense
                )
              VCol(md="1")
                VBtn(text color="primary") Go
              VCol(md="1")
                VBtn(text color="primary")
                  VIcon mdi-chevron-right
      VCol.right
        VIcon mdi-filter
        VTextField(
          label="Name"
          v-model="search"
          hide-details
        )
        VCombobox(
          :items="availableTags"
          label="Tags"
          hint="You can inpupt custom tag and press enter to add."
          v-model="tags"
          multiple
          chips
        )
        VBtn(text color="primary") Filter
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import Challenge from '@/views/index/models/challenge'
import axios from 'axios'
@Component({
  components: {},
})
export default class ChallengeList extends Vue {
  private headers = [
    {
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
      text: 'Solved',
      align: 'center',
      sortable: true,
      value: 'solved',
    }, {
      text: 'Action',
      align: 'center',
      sortable: false,
      value: 'action',
    },
  ]
  private availableTags = ['Web', 'Crypto', 'PWN', 'Reverse', 'Misc', 'Mobile']
  private challenges = []
  private pageSize: number = 20
  private search: string = ''
  private tags: string[] = []
  private page: number = 1
  private loading: boolean = false

  public created() {
    this.loading = true
    axios.get('/api/v1/challenge/list').then((resp) => {
      this.challenges = resp.data
      this.challenges.forEach((challenge: Challenge) => {
        challenge.solved = 0
      })
      this.loading = false
    }).catch((resp) => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>
.challenge-container
  width 95%
  margin 0 auto
  .container
    padding: 0
  .table
    min-height calc(100vh - 72px)
  .right
    margin 0 0 0 4%
    padding 12px 12px 12px 2%
    border-left 1px solid #dcdcdc
  .input-page
    margin 0
    & >>> input
      text-align center
</style>