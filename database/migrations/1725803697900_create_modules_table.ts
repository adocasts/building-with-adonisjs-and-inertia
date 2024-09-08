import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'modules'

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
        .integer('course_id')
        .unsigned()
        .references('courses.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('statuses.id')
        .onDelete('CASCADE')
        .notNullable()

      table.string('name', 100).notNullable()
      table.text('notes')
      table.integer('order').unsigned().notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
