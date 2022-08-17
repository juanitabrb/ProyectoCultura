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
}