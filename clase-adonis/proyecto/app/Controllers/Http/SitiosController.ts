import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sitio from '../../Models/Sitio';

export default class SitiosController {

    public async index(ctx:HttpContextContract){
        let sitios:Sitio[]=await Sitio.query()
        return sitios;
    }

    public async show({params}:HttpContextContract) {
        return Sitio.findOrFail(params.id);
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_sitio:Sitio=await Sitio.create(body);
        return nuevo_sitio;
    }

    public async destroy({params}:HttpContextContract) {
        const el_sitio:Sitio=await Sitio.findOrFail(params.id);
        return el_sitio.delete();
    }

    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_sitio:Sitio=await Sitio.findOrFail(params.id);
        el_sitio.nombre=body.nombre;
        el_sitio.direccion=body.direccion;
        el_sitio.capacidad=body.capacidad;
        return el_sitio.save();
    }
}
