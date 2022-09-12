import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reserva extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_usuario: number

  @column()
  public id_evento: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
