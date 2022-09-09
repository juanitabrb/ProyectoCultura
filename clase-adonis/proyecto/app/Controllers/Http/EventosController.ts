import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Evento from "App/Models/Evento";

export default class EventosController {
    public async index(ctx:HttpContextContract){
        let usuarios:Evento[]=await Evento.query();
        return usuarios;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_usuario:Evento=await Evento.create(body);
        return nuevo_usuario;
    }
}
