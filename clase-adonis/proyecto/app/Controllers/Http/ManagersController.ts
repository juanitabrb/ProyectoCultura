import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Manager from 'App/Models/Manager';

export default class ManagersController {
    public async index(ctx:HttpContextContract){
        let managers:Manager[]=await Manager.query();
        return managers;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_usuario:Manager=await Manager.create(body);
        return nuevo_usuario;
    }
    public async show({params}:HttpContextContract) {
        return Manager.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_manager:Manager=await Manager.findOrFail(params.id);
        el_manager.nombre=body.nombre;
        el_manager.contacto=body.contacto;
        return el_manager.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_manager:Manager=await Manager.findOrFail(params.id);
        return el_manager.delete();
    }
}
