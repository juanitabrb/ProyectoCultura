import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserva from 'App/Models/Reserva';

export default class ReservasController {

    public async index(ctx:HttpContextContract){
        let reservas:Reserva[]=await Reserva.query()
        return reservas;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const la_reserva:Reserva=await Reserva.create(body);
        return la_reserva;
    }

    public async show({params}:HttpContextContract) {
        return Reserva.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const la_reserva:Reserva=await Reserva.findOrFail(params.id);
        la_reserva.id_usuario=body.id_usuario;
        la_reserva.id_evento=body.id_evento;
        return la_reserva.save();
    }
    public async destroy({params}:HttpContextContract) {
        const la_reserva:Reserva=await Reserva.findOrFail(params.id);
        return la_reserva.delete();
    }
}
