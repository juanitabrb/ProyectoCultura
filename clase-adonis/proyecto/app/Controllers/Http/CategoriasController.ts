import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Categoria from "App/Models/Categoria";

export default class CategoriasController {
    public async index(ctx:HttpContextContract){
        let categorias:Categoria[]=await Categoria.query();
        return categorias;
    }

    public async store({request}:HttpContextContract){
        const body=request.body();
        const nueva_Categoria:Categoria=await Categoria.create(body);
        return nueva_Categoria;
    }

    public async show({params}:HttpContextContract) {
        return Categoria.findOrFail(params.id);
    }
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const la_categoria:Categoria=await Categoria.findOrFail(params.id);
        la_categoria.nombre=body.nombre;
        return la_categoria.save();
    }
    public async destroy({params}:HttpContextContract) {
        const la_categoria:Categoria=await Categoria.findOrFail(params.id);
        return la_categoria.delete();
    }
    
}
