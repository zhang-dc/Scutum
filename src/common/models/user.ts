export class User {
  public username: string

  constructor() {
    this.username = ''
  }
}
export const UserMutation = {
  UpdateUserInfo(user: User): void {
    user.username = '123'
  },
}
export const UserAction = {

}
