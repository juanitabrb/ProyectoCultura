import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Programacion from '../../Models/Programacion';

export default class ProgramacionsController {

    public async index(ctx:HttpContextContract){
        let programaciones:Programacion[]=await Programacion.query()
        return programaciones;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const la_prog:Programacion=await Programacion.create(body);
        return la_prog;
    }

    public async show({params}:HttpContextContract) {
        return Programacion.findOrFail(params.id);
    }

    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const la_prog:Programacion=await Programacion.findOrFail(params.id);
        la_prog.descripcion=body.descripcion;
        la_prog.foto=body.foto;
        la_prog.id_evento=body.id_evento;
        return la_prog.save();
    }

    public async destroy({params}:HttpContextContract) {
        const la_prog:Programacion=await Programacion.findOrFail(params.id);
        return la_prog.delete();
    }  

}


