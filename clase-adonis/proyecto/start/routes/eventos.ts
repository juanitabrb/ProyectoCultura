import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/eventos', 'EventosController.index')
  Route.get('/eventos/:id', 'EventosController.show')
  Route.post('/eventos', 'EventosController.store')
  Route.put('/eventos/:id', 'EventosController.update')
  Route.delete('/eventos/:id', 'EventosController.destroy')
}).middleware(['auth:api' /*'permisos'*/])
