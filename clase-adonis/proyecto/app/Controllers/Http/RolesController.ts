import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 
import Rol from "App/Models/Rol";
import Usuario from 'App/Models/Usuario';
export default class RolesController {
    public async index(ctx:HttpContextContract){
        let roles:Rol[]=await Rol.query().preload('permisos')
        return roles;
    }
    public async store({request}:HttpContextContract){
        const body=request.body();
        const el_rol:Rol=await Rol.create(body);
        return el_rol;
    }
    public async show({params}:HttpContextContract) {
        return Rol.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_rol:Rol=await Rol.findOrFail(params.id);
        el_rol.nombre=body.nombre;
        return el_rol.save();
    }
   
    public async destroy({params}:HttpContextContract) {
        let usuarios= await Usuario.query()
                                   .where('id_rol',params.id)
        if(usuarios){
            return {
                "error":"El rol tiene usuarios asociados",
                "usuarios":usuarios
            }
        }else{
            const el_rol:Rol=await Rol.findOrFail(params.id);
            return el_rol.delete();
        }
 
    }    
}
