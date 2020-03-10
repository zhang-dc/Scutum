import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import Challenge from '~/models/challenge'
import axios from 'axios'

@Module
class Challenges extends VuexModule {
  public challenges: Challenge[] = []

  @Mutation
  public updateChallenges(challenges: Challenge[]) {
    this.challenges = challenges
  }

  @Action({ commit: 'getChallengesList' })
  public getChallengesList() {
    axios.get('/api/v1/challenge/list')
  }
}

export default getModule(Challenges)
