import Route from '@ioc:Adonis/Core/Route'

Route.group(
    ()=> {
        Route.get("/permisos","PermisosController.index");
        Route.post("/permisos","PermisosController.store");
        Route.get("/permisos/:id","PermisosController.show");
        Route.put("/permisos/:id","PermisosController.update");
        Route.delete("/permisos/:id","PermisosController.destroy");
    }
).middleware(['permisos'])