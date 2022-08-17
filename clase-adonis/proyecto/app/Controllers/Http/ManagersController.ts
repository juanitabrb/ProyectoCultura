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
}
