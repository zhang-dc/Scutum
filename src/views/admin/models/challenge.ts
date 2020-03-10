import Flag from './flag'

export default class Challenge {
  public _id: string = ''
  public type: string = 'Static'
  public title: string = ''
  public description: string = ''
  public tags: string[] = []
  public file!: string
  public image!: string
  public ports!: number[]
  public flag!: Flag
  public score: number = 0
  public solution!: string
}
