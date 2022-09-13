import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany,hasOne,
  HasOne ,belongsTo,
  BelongsTo,} from '@ioc:Adonis/Lucid/Orm'
import Agrupacion from './Agrupacion'
import Programacion from './Programacion';
import Sitio from './Sitio';
import Usuario from './Usuario';

export default class Evento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string;

  @column()
  public descripcion:string;

  @column()
  public fecha:DateTime;

  @column()
  public id_sitio:number

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
  public roles: ManyToMany<typeof Agrupacion>

  @hasOne(() => Programacion,{
    foreignKey: 'id_programacion'
  })
  public perfil: HasOne<typeof Programacion>

  @belongsTo(() => Sitio,{
    foreignKey: 'id_sitio',  //Nombre de la clave foránea de la entidad dominante
  })
  public rol: BelongsTo<typeof Sitio>

  @manyToMany(() => Usuario, {
    pivotTable: 'reservas', //Nombre tabla pivote
    pivotForeignKey: 'id_evento', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'id_usuario', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
    pivotColumns: ['created_at'] //obtener datos de columnas adicionales
  })
  public usuarios: ManyToMany<typeof Usuario>



}
