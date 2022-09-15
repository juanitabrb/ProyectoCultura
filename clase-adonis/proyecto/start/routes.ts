/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get("/usuarios","UsuariosController.index");
Route.post("/usuarios","UsuariosController.store");
Route.get("/usuarios/:id","UsuariosController.show");
Route.put("/usuarios/:id","UsuariosController.update");
Route.delete("/usuarios/:id","UsuariosController.destroy");

Route.get("/contratos","ContratosController.index");
Route.post("/contratos","ContratosController.store");
Route.get("/contratos/:id","ContratosController.show");
Route.put("/contratos/:id","ContratosController.update");
Route.delete("/contratos/:id","ContratosController.destroy");

Route.post("/emailtest","EmailsController.index");

Route.get("/programaciones","ProgramacionsController.index");
Route.get("/programaciones/:id","ProgramacionsController.show");
Route.post("/programaciones","ProgramacionsController.store");
Route.delete("/programaciones/:id","ProgramacionsController.destroy");
Route.put("/programaciones/:id","ProgramacionsController.update");

Route.get("/reservas","ReservasController.index");
Route.post("/reservas","ReservasController.store");
Route.delete("/reservas/:id","ReservasController.destroy");
Route.put("/reservas/:id","ReservasController.update");

Route.get("/eventos","EventosController.index");
Route.post("/eventos","EventosController.store");
Route.put("/eventos/:id","EventosController.update");
Route.delete("/eventos/:id","EventosController.destroy");

Route.get("/sitios","SitiosController.index");
Route.get("/sitios/:id","SitiosController.show");
Route.post("/sitios","SitiosController.store");
Route.delete("/sitios/:id","SitiosController.destroy");
Route.put("/sitios/:id","SitiosController.update");

Route.get("/agrupacions","AgrupacionsController.index");
Route.post("/agrupacions","AgrupacionsController.store");
Route.put("/agrupacions/:id","AgrupacionsController.update");
Route.delete("/agrupacions/:id","AgrupacionsController.destroy");

Route.get("/managers","ManagersController.index");
Route.post("/managers","ManagersController.store");
Route.put("/managers/:id","ManagersController.update");
Route.delete("/managers/:id","ManagersController.destroy");

Route.get("/categorias","CategoriasController.index");
Route.post("/categorias","CategoriasController.store");

Route.post("/login","SeguridadController.login");
Route.post("/forgot","SeguridadController.forgotPassword");
Route.post("/reset","SeguridadController.resetPassword");
Route.post("/logout","SeguridadController.logout");

