import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  beforeSave,
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil';
import Rol from './Rol';
import ApiToken from './ApiToken';
import Hash from '@ioc:Adonis/Core/Hash'

export default class Usuario extends BaseModel {
  public static table = 'usuarios'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public correo:string;

  @column()
  public contrasena:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
 

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Colocar este atributo de manera obligatoria
  @column()
  public id_rol:number

  @hasOne(() => Perfil,{
      foreignKey: 'id_usuario'
  })
  public perfil: HasOne<typeof Perfil>
 
  @belongsTo(() => Rol,{
    foreignKey: 'id_rol',
  })
  public rol: BelongsTo<typeof Rol>

  @hasMany(() => ApiToken,{
    foreignKey: 'id_usuario',
  })
  public usuarios: HasMany<typeof ApiToken>


  @beforeSave()
  public static async hashPassword (el_usuario: Usuario) {
    if (el_usuario.$dirty.contrasena) {
      el_usuario.contrasena = await Hash.make(el_usuario.contrasena)
    }
  }
}
