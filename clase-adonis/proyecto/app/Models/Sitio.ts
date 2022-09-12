import { DateTime } from 'luxon'
import Evento from './Evento';
import { BaseModel, column ,hasMany,
  HasMany} from '@ioc:Adonis/Lucid/Orm'

export default class Sitio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public direccion:string;

  @column()
  public capacidad: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Evento,{
    foreignKey: 'id_evento' //Nombre clave propagada de la entidad actual a la dominada
 
  })
  public eventos: HasMany<typeof Evento>

}
