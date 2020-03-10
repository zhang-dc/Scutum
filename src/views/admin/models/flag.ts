export default class Flag {
  public flag: string = ''
  private _type: string = 'static'
  private _generator: string = 'container'

  public get type() {
    return this._type
  }

  public set type(type: string) {
    if (type in ['host', 'container']) {
      this._type = type
    }
  }

  public get generator() {
    return this._generator
  }

  public set generator(method: string) {
    if (method in ['host', 'container']) {
      this._generator = method
    }
  }
}
