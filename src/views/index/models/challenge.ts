export default class Challenge {
  public _id: string = ''
  public type: string = 'Static'
  public title: string = ''
  public description: string = ''
  public tags: string[] = []
  public file!: string
  public image!: string
  public score: number = 0
  public solved: number = 0
}
