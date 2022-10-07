import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';

export default class ContratosController {
    public async index(ctx:HttpContextContract){
        let contratos:Contrato[]=await Contrato.query();
        return contratos;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nuevo_contrato:Contrato=await Contrato.create(body);
        return nuevo_contrato;
    }

    public async show({params}:HttpContextContract) {
        return Contrato.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_contrato:Contrato=await Contrato.findOrFail(params.id);
        el_contrato.id_agrupacion=body.id_agrupacion;
        el_contrato.id_evento=body.id_evento;
        return el_contrato.save();
    }
    public async destroy({params}:HttpContextContract) {
        const el_contrato:Contrato=await Contrato.findOrFail(params.id);
        return el_contrato.delete();
    }
}
