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
}
