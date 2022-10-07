import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Agrupacion from "App/Models/Agrupacion";

export default class AgrupacionsController {
    public async index(ctx:HttpContextContract){
        let agrupaciones:Agrupacion[]=await Agrupacion.query().preload('manager');
        return agrupaciones;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nueva_agrupacion:Agrupacion=await Agrupacion.create(body);
        return nueva_agrupacion;
    }

    public async show({params}:HttpContextContract) {
        return Agrupacion.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const la_agrupacion:Agrupacion=await Agrupacion.findOrFail(params.id);
        la_agrupacion.nombre=body.nombre;
        la_agrupacion.descripcion=body.descripcion;
        return la_agrupacion.save();
    }
    public async destroy({params}:HttpContextContract) {
        const la_agrupacion:Agrupacion=await Agrupacion.findOrFail(params.id);
        return la_agrupacion.delete();
    }
}