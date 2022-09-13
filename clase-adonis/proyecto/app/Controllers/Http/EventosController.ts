import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Evento from "App/Models/Evento";

export default class EventosController {
    public async index(ctx:HttpContextContract){
        let eventos:Evento[]=await Evento.query()
        return eventos;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_evento:Evento=await Evento.create(body);
        return nuevo_evento;
    }
}
