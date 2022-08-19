import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permiso_rol'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('id_rol').unsigned().references('roles.id')

      table.integer('id_permiso').unsigned().references('permisos.id')

      table.unique(['id_rol','id_permiso'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
