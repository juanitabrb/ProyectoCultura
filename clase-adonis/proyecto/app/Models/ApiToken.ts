import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class ApiToken extends BaseModel {
  public static table = 'api_tokens'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_usuario: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public expires_at: DateTime

  @belongsTo(() => Usuario,{
    localKey: 'id_usuario',
  })
  public rol: BelongsTo<typeof Usuario>
}
