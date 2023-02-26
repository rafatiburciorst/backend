import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsers extends BaseSeeder {
  public static developmentOnly: boolean = false
  public async run() {
    await User.createMany([
      { email: 'admin@admin.com', password: '123456', role: 'admin', name: 'Admin' },
      { email: 'normal@admin.com', password: '123456', role: 'normal', name: 'Normal' },
    ])
  }
}
