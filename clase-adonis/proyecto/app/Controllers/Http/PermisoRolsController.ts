import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermisoRol from 'App/Models/PermisoRol';
 
export default class PermisosRolesController {
    public async index(ctx:HttpContextContract){
        let permisosRoles:PermisoRol[]=await PermisoRol.query()
        return permisosRoles;
    }
    public async store({request}:HttpContextContract){
        const body=request.body();
        const el_permiso_rol:PermisoRol=await PermisoRol.create(body);
        return el_permiso_rol;
    }
    public async show({params}:HttpContextContract) {
        return PermisoRol.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_permiso_rol:PermisoRol=await PermisoRol.findOrFail(params.id);
        el_permiso_rol.id_rol=body.id_rol;
        el_permiso_rol.id_permiso=body.id_permiso;
        return el_permiso_rol.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_permiso_rol:PermisoRol=await PermisoRol.findOrFail(params.id);
        return el_permiso_rol.delete();
    }
}
