import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Permiso from 'App/Models/Permiso';

const datosBase = {
  url:"/permisos",
  metodo: "POST",
}

test.group('Permisos', () => {
  test('crear permisos', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/permisos')
      .json(datosBase)
    
    const new_user = await Permiso.query()
      .where('url', datosBase.url).firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['url', 'id', 'metodo', 'created_at', 'updated_at']
    );

  });

  test('ver permisos', async ({ client, assert }) => {
    const nuevo_manager: Permiso = await Permiso.create(datosBase)
    const response = await client.get('/permisos/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'metodo', datosBase.metodo
    );
  });

  test('listar permisos', async ({ client }) => {
    const response = await client.get('/permisos')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar permisos', async ({ client, assert }) => {
    const nuevo_manager: Permiso = await Permiso.create(
      datosBase
    )
    const response = await client.put('/permisos/' + nuevo_manager.id)
      .json({
        metodo:"DELETE"
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'metodo', 'DELETE'
    );
  });

  test('eliminar permisos', async ({ client, assert }) => {
    const nuevo_manager: Permiso = await Permiso.create(datosBase)
    const response = await client.delete('/permisos/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
