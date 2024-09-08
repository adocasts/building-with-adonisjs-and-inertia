import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lessons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('organization_id')
        .unsigned()
        .references('organizations.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('access_level_id').unsigned().references('access_levels.id').notNullable()
      table
        .integer('module_id')
        .unsigned()
        .references('modules.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('status_id').unsigned().references('statuses.id').notNullable()

      table.string('name', 150).notNullable()
      table.text('notes')
      table.integer('order').unsigned().notNullable().defaultTo(0)

      table.timestamp('publish_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
