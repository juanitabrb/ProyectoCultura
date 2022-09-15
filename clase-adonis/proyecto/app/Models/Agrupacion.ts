import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Manager from './Manager';
import Evento from './Evento';

export default class Agrupacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public descripcion:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Manager,{
    foreignKey: 'id_agrupacion'
  })
  public manager:HasOne<typeof Manager>

  @manyToMany(() => Evento, {
    pivotTable: 'contratoes', //Nombre tabla pivote
    pivotForeignKey: 'id_agrupacion', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'id_evento', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
    //pivotColumns: ['created_at'] //obtener datos de columnas adicionales
  })
  public eventos: ManyToMany<typeof Evento>
}
