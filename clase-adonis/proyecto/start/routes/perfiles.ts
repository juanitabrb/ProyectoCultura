import Route from '@ioc:Adonis/Core/Route'

Route.group(
    ()=> {
        Route.get("/perfiles","PerfilesController.index");
        Route.post("/perfiles","PerfilesController.store");
        Route.get("/perfiles/:id","PerfilesController.show");
        Route.put("/perfiles/:id","PerfilesController.update");
        Route.delete("/perfiles/:id","PerfilesController.destroy");
    }
).middleware(['auth:api', 'permisos'])