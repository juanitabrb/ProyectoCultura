import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Evento from "App/Models/Evento";

export default class EventosController {
    public async index(ctx:HttpContextContract){
        let eventos:Evento[]=await Evento.query().preload('sitio').preload('programacion').preload('categoria').preload('agrupaciones')
        //TODO:implementar preload de la programación de este evento
        return eventos;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_evento:Evento=await Evento.create(body);
        return nuevo_evento;
    }
    public async show({params}:HttpContextContract) {
        return Evento.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_evento:Evento=await Evento.findOrFail(params.id);
        el_evento.nombre=body.nombre;
        el_evento.descripcion=body.descripcion;
        el_evento.fecha=body.fecha;
        el_evento.id_categoria=body.id_categoria;
        el_evento.id_sitio=body.id_sitio;
        return el_evento.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_evento:Evento=await Evento.findOrFail(params.id);
        return el_evento.delete();
    }
}
