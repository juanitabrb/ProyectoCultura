import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Agrupacion from './Agrupacion'
import Categoria from './Categoria';

export default class Evento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public descripcion:string;

  @column()
  public fecha:DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Agrupacion, {
    pivotTable: 'contratos', //Nombre tabla pivote
    pivotForeignKey: 'id_evento',
    pivotRelatedForeignKey:'id_agrupacion'
    //pivotColumns: ['nombre-columna'] //obtener datos de columnas adicionales
  })
  public agrupaciones: ManyToMany<typeof Agrupacion>

  @belongsTo(() => Categoria,{
    foreignKey: 'id_categoria',  //Nombre de la clave foránea de la entidad dominante
  })
  public categoria: BelongsTo<typeof Categoria>
}
