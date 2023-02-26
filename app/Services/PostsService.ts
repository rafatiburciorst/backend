import { inject } from "@adonisjs/fold";

@inject()
export default class PostsService {

  private users: [] = [
    { name: 'Rafael', age: 35 },
    { name: 'Daniel', age: 9 },
  ]

  async findAll() {
    return this.users
  }

  async create(payload: any) {
    this.users.push(payload)
    return this.users
  }

}
