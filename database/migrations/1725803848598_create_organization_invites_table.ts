import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_invites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('organization_id')
        .unsigned()
        .references('organizations.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('invited_by_user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('canceled_by_user_id').unsigned().references('users.id').onDelete('SET NULL')

      table.string('email', 254).notNullable()
      table.integer('role_id').unsigned().references('roles.id').onDelete('CASCADE').notNullable()

      table.timestamp('accepted_at')
      table.timestamp('canceled_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
