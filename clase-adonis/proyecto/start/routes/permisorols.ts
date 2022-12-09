import Route from '@ioc:Adonis/Core/Route'

Route.group(
    ()=> {
        Route.get("/permisorols","PermisoRolsController.index");
        Route.post("/permisorols","PermisoRolsController.store");
        Route.get("/permisorols/:id","PermisoRolsController.show");
        Route.put("/permisorols/:id","PermisoRolsController.update");
        Route.delete("/permisorols/:id","PermisoRolsController.destroy");
    }
)
//.middleware(['permisos'])