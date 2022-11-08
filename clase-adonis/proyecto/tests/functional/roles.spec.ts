import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Rol from 'App/Models/Rol';

const datosBase = {
  nombre:"adminprueba"
}

test.group('Roles', () => {
  test('crear roles', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/roles')
      .json(datosBase)
    
    const new_user = await Rol.query()
      .where('nombre', datosBase.nombre).firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['nombre', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver roles', async ({ client, assert }) => {
    const nuevo_manager: Rol = await Rol.create(datosBase)
    const response = await client.get('/roles/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'nombre', datosBase.nombre
    );
  });

  test('listar roles', async ({ client }) => {
    const response = await client.get('/roles')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar roles', async ({ client, assert }) => {
    const nuevo_manager: Rol = await Rol.create(
      datosBase
    )
    const response = await client.put('/roles/' + nuevo_manager.id)
      .json({
        nombre:"adminpruebamodified"
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'nombre', 'adminpruebamodified'
    );
  });

  test('eliminar roles', async ({ client, assert }) => {
    const nuevo_manager: Rol = await Rol.create(datosBase)
    const response = await client.delete('/roles/' + nuevo_manager.id)
    response.assertStatus(200)
    console.log(response.body())
    assert.isEmpty(response.body())
  });
})
