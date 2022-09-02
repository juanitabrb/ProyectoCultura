import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Manager extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public id_agrupacion:string;

  @column()
  public nombre:string;

  @column()
  public contacto:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
