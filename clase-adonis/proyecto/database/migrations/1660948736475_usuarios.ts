import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.alterTable('usuarios',(table)=>{
      table
            .integer('id_rol')
            .unsigned()
            .references('roles.id')
            .onDelete('CASCADE')
    })
    
  }

}
