import Roles from '#enums/roles'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        id: Roles.MEMBER,
        name: 'Members',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}
