import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

import Perfil from './Perfil';
import Rol from './Rol';

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public correo:string;

  @column()
  public contrasena:string;

  @column()
  public id_rol:number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Perfil,{
    foreignKey: 'id_usuario'
  })
  public perfil:HasOne<typeof Perfil>

  @belongsTo(() => Rol,{
    foreignKey: 'id_rol',  //Nombre de la clave foránea de la entidad dominante
  })
  public rol: BelongsTo<typeof Rol>
}
