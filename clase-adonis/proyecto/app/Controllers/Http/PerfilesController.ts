import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil';

export default class PerfilesController {
    public async index(ctx:HttpContextContract){
        let perfiles:Perfil[]=await Perfil.query();
        return perfiles;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_perfil:Perfil=await Perfil.create(body);
        return nuevo_perfil;
    }

    public async show({params}:HttpContextContract) {
        return Perfil.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_perfil:Perfil=await Perfil.findOrFail(params.id);
        el_perfil.celular=body.celular;
        el_perfil.url_instagram=body.url_instagram;
        return el_perfil.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_perfil:Perfil=await Perfil.findOrFail(params.id);
        return el_perfil.delete();
    }
}
