import Route from '@ioc:Adonis/Core/Route'

Route.group(
    ()=> {
        Route.get("/usuarios","UsuariosController.index");
        Route.post("/usuarios","UsuariosController.store");
        Route.get("/usuarios/:id","UsuariosController.show");
        Route.put("/usuarios/:id","UsuariosController.update");
        Route.delete("/usuarios/:id","UsuariosController.destroy");
    }
)//.middleware(['auth:api', 'permisos'])