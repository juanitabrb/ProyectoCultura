import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permiso from 'App/Models/Permiso';
 
export default class PermisosController {
    public async index(ctx:HttpContextContract){
        let permisos:Permiso[]=await Permiso.query().preload('roles')
        return permisos;
    }
    public async store({request}:HttpContextContract){
        const body=request.body();
        const el_permiso:Permiso=await Permiso.create(body);
        return el_permiso;
    }
    public async show({params}:HttpContextContract) {
        return Permiso.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_permiso:Permiso=await Permiso.findOrFail(params.id);
        el_permiso.url=body.url;
        el_permiso.metodo=body.metodo;
        return el_permiso.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_permiso:Permiso=await Permiso.findOrFail(params.id);
        return el_permiso.delete();
    }
}
 
