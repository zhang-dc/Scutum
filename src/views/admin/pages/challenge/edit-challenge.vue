<template lang="pug">
  VContainer.editchallenge-container
    VToolbar(flat)
      VIcon(@click="back") mdi-chevron-left
      VToolbarTitle Edit challenge
    VContainer.form
      VRow(no-gutters)
        VCol
          VTextField(
            label="Title"
            v-model="challenge.title"
            required
            hide-details
          )
      VRow(no-gutters)
        VCol
          VTextarea(
            label="Description"
            v-model="challenge.description"
          )
      VRow(no-gutters)
        VCol
          VFileInput(
            label="File"
            v-model="file"
          )
      //- VRow(no-gutters)
      //-   VCol
      //-     VAutocomplete(
      //-       label="Docker Image Name"
      //-       hint="Type to search an image on docker hub..."
      //-       v-model="challenge.image"
      //-       refs="search"
      //-       :items="searchResult"
      //-       :loading="searchLoading"
      //-       :search-input.sync="searchTerm"
      //-       :menu-props="{ top: true, offsetY: true, fixed: true }"
      //-       :attach="$refs.search"
      //-       content-class="search-results"
      //-       prepend-icon="mdi-magnify"
      //-       item-text="name"
      //-       item-value="name"
      //-       no-filter
      //-     )
      //-       template(v-slot:append-item)
      //-         VListItemContent(v-if="totalPages !== 0")
      //-           VPagination(
      //-             v-model="searchPage"
      //-             :total-visible="8"
      //-             :length="totalPages",
      //-           )
      //-           VProgressLinear(v-if="searchLoading" indeterminate)
      //-       template(v-slot:item="{ item }")
      //-         VListItemContent
      //-           div {{ item.name }}
      //-           div {{ item.short_description }}
      //-           //- VListItemTitle(v-text="item.name")
      //-           //- VListItemSubtitle(v-text="item.short_description")
      //-         VListItemAction
      //-           VContainer
      //-             VRow(align="center" no-gutters)
      //-               VCol
      //-                 VIcon.search-item-action mdi-star
      //-               VCol
      //-                 span.search-item-action {{ item.star_count }}
      //-               VCol
      //-                 VIcon.search-item-action mdi-download
      //-               VCol
      //-                 span.search-item-action {{ item.pull_count }}
      //-               VCol
      //-                 VIcon.search-item-action(@click.stop="openDetailPage(item)") mdi-open-in-new
      VRow(no-gutters)
        VCol
          VTextField(
            label="Docker Image Name"
            hint="Type to search an image on docker hub..."
            v-model="challenge.image"
            :loading="searchLoading"
            prepend-icon="mdi-magnify"
          )
      VExpandTransition(v-if="searchResult.length !== 0")
        VCard.search-result(v-show="searchResult.length !== 0" key="search-result")
          VList
            VListItem(v-for="item in searchResult" :key="item.name" @click="select(item)")
              VListItemContent
                div {{ item.name }}
                div {{ item.short_description }}
                //- VListItemTitle(v-text="item.name")
                //- VListItemSubtitle(v-text="item.short_description")
              VListItemAction
                VContainer
                  VRow(align="center" no-gutters)
                    VCol
                      VIcon.search-item-action mdi-star
                    VCol
                      span.search-item-action {{ item.star_count }}
                    VCol
                      VIcon.search-item-action mdi-download
                    VCol
                      span.search-item-action {{ item.pull_count }}
                    VCol
                      VTooltip.search-item-action(bottom)
                        template(v-slot:activator="{ on }")
                          VIcon(v-on="on" @click="add" @click.stop="openDetailPage(item)") mdi-open-in-new
                        span Open detail page
      div(key="result-pagination" v-show="totalPages !== 0")
        VPagination(
          v-model="searchPage"
          :total-visible="8"
          :length="totalPages",
        )
        VProgressLinear(v-if="searchLoading" indeterminate)
      VRow(align="end" no-gutters)
        VCol(md="4")
          VSelect(
            label="Type"
            v-model="challenge.type"
            :items="['Code', 'Static', 'Dynamic']"
            :hint="challengeTypeHint"
          )
        VCol(md="7" offset-md="1")
          VCombobox(
            label="Tags"
            hint="You can inpupt custom tag and press enter to add."
            v-model="challenge.tags"
            :items="availableTags"
            multiple
            chips
          )
            template(v-slot:selection="{ item, index }")
              VChip(
                @click:close="challenge.tags.splice(index, 1)"
                close
                small
              ) {{item}}
      VRow(no-gutters v-if="challenge.type === 'Static'")
        VCol
          VTextField(
            label="Flag"
            hint="Flag is automatically wrapped with `prefix{}`, you can change it in settings."
            :model="challenge.flag"
          )
      VRow.submit(no-gutters justify="center")
        VBtn(tile color="primary" @click="submit" :loading="submitting") Submit
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { debounce } from '~/util/decorators'
import Challenge from '@/views/admin/models/challenge'
import axios from 'axios'
@Component({
  components: {},
})
export default class  extends Vue {
  private loadingChallenge: boolean = false
  private challenge: Challenge = new Challenge()
  private file: File | null = null
  private availableTags: string[] = ['Web', 'Crypto', 'PWN', 'Reverse', 'Misc', 'Mobile']
  private searchLoading: boolean = false
  private searchPage: number = 1
  private totalPages: number = 0
  private pageSize: number = 25
  private searchResult: any[] = []
  private cachedResult: any = {}
  // when select a result, stop searcing for that name
  private stopSearch: boolean = false
  private submitting:boolean = false

  get challengeTypeHint(): string {
    const hints: {[key: string]: string} = {
      '': '',
      'Code': 'Test the code submitted with examples',
      'Static': 'A challenge with a flag within it',
      'Dynamic': 'Flags are generated dynamically',
    }
    return hints[this.challenge.type]
  }

  @Watch('searchPage')
  private searchOnPageChange() {
    if (this.challenge.image && this.challenge.image !== '') {
      this.searchImage()
    }
  }

  @Watch('challenge.image')
  private searchOnTermChange(newTerm: string) {
    if (newTerm && newTerm !== '') {
      this.searchPage = 1
      this.searchImage()
    }
  }

  private cacheResult(result: any, query: string, page: number) {

  }

  @debounce(1000)
  private searchImage() {
    if (this.challenge.image === '') {
      this.searchResult = []
      this.totalPages = 0
      return
    }
    if (this.stopSearch === false) {
      this.searchLoading = true
      axios.get('/api/v1/challenge/search', {
        params: {
          q: this.challenge.image,
          page: this.searchPage,
          page_size: this.pageSize,
        },
      }).then((resp) => {
        if (resp.status === 200 && resp.data.summaries) {
          this.cachedResult[resp.data.page] = resp.data.summaries.filter((result: any) => result.source !== 'store')
          this.searchResult = this.cachedResult[resp.data.page]
          this.totalPages = Math.round(resp.data.count / this.pageSize)
        } else {
          return
        }
      }).finally(() => {
        this.searchLoading = false
      })
    } else {
      this.stopSearch = false
    }
  }

  private doSearch() {
    return axios.get('/api/v1/challenge/search', {
        params: {
          q: this.challenge.image,
          page: this.searchPage,
          page_size: this.pageSize,
        },
      }).then((resp) => {
        return resp.data
      }).catch((resp) => {
        console.error('Failed to get server response.')
      })
  }

  private select(item: any) {
    this.challenge.image = item.name
    this.stopSearch = true
  }

  private openDetailPage(item: any) {
    window.open(`https://hub.docker.com/r/${item.name}`)
  }

  private submit() {
    this.submitting = true
    axios.post('/api/v1/challenge/edit', this.challenge).then((resp) => {
      this.submitting = false
    })
  }

  private back() {
    this.$router.push('/challenge/')
  }

  private created() {
    this.loadingChallenge = true
    axios.get('/api/v1/challenge/get', {
      params: {
        id: this.$route.query.id,
      }
    }).then((resp) => {
      this.challenge = resp.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.editchallenge-container
  min-height calc(100vh - 72px)
  margin 0 10vw
  background #ffffff
  .form
    width 80%
    max-width 720px
    margin 0 auto
  .search-result
    max-height 600px
    overflow-y auto
  & >>> .v-select__selections
    min-height 32px
  .submit
    margin-top 36px
</style>