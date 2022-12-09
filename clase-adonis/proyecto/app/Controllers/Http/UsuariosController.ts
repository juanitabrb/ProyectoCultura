import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Perfil from 'App/Models/Perfil';
import EmailService from 'App/Services/EmailService';
 
export default class UsuariosController {
    /**
     * Lista todos los usuarios
     */
    public async index(ctx:HttpContextContract){
        let usuarios:Usuario[]=await Usuario.query().preload('rol').preload('perfil')
        return usuarios;
    }
    /**
     * Almacena la información de un usuario
     */
    public async store({request}:HttpContextContract){
        const body=request.body();
        //body.contrasena=Encryption.encrypt(body.contrasena);
        const nuevo_usuario:Usuario=await Usuario.create(body);
        let theEmailService:EmailService=new EmailService();
        theEmailService.sendEmail(body.correo,
        "Nuevo Inicio de Sesión","Usted acaba de iniciar sesión en el sistema.")
        return nuevo_usuario;
    }
    /**
     * Muestra la información de un solo usuario
     */
    public async show({params}:HttpContextContract) {
        let el_usuario=await Usuario.query().where("id",params.id).preload('perfil').preload('eventos').firstOrFail();
        return el_usuario;
    }
    /**
     * Actualiza la información de un usuario basado
     * en el identificador y nuevos parámetros
     */
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_usuario:Usuario=await Usuario.findOrFail(params.id);
        el_usuario.nombre=body.nombre;
        el_usuario.correo=body.correo;
        if(body.contrasena){
            console.log(body.contrasena);
            el_usuario.contrasena=Encryption.encrypt(body.contrasena);
        }
        el_usuario.id_rol=body.id_rol;
        if(body.perfil){
            body.perfil.id_usuario=params.id;
            await this.setPerfil(body.perfil);
        }
       
        return el_usuario.save();
    }
    public async setPerfil(info_perfil){
        const perfil_usuario=await Perfil.findBy('id_usuario',info_perfil.id_usuario );
            if(perfil_usuario){
                perfil_usuario.celular=info_perfil.celular;
                perfil_usuario.url_instagram=info_perfil.url_instagram;
                await perfil_usuario.save();
            }else{
                await Perfil.create(info_perfil);
            }
    }
    /**
     * Elimina a un usuario basado en el identificador
     */
    public async destroy({params}:HttpContextContract) {
        const el_usuario:Usuario=await Usuario.findOrFail(params.id);
        return el_usuario.delete();
    }    

    public async sendEmail(ctx:HttpContextContract){
        let theEmailService:EmailService=new EmailService();
        theEmailService.sendEmail("juaniburiti@gmail.com","Nuevo Inicio de Sesión","Usted acaba de iniciar sesión en el sistema.")

    }
}
