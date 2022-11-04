import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Agrupacion from 'App/Models/Agrupacion';

test.group('Agrupacion', () => {
  test('crear agrupaciones', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/agrupaciones')
      .json({
        nombre:"pruebaagrupacion",
        descripcion:"una banda muy famosa de rock britanica"
      })
    
    const new_user = await Agrupacion.query()
      .where('nombre', 'pruebaagrupacion').firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['nombre', 'descripcion', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver manager', async ({ client, assert }) => {
    const nuevo_manager: Agrupacion = await Agrupacion.create(
      { nombre:"pruebaagrupacion",
      descripcion:"una banda muy famosa de rock britanica" }
    )
    const response = await client.get('/agrupaciones/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'nombre', 'pruebaagrupacion'
    );
  });

  test('listar agrupaciones', async ({ client }) => {
    const response = await client.get('/agrupaciones')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar agrupaciones', async ({ client, assert }) => {
    const nuevo_manager: Agrupacion = await Agrupacion.create(
      { nombre:"pruebaagrupacion",
      descripcion:"una banda muy famosa de rock britanica" }
    )
    const response = await client.put('/agrupaciones/' + nuevo_manager.id)
      .json({
        descripcion:"descripcionmodificada"
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'descripcion', 'descripcionmodificada'
    );
  });

  test('eliminar agrupaciones', async ({ client, assert }) => {
    const nuevo_manager: Agrupacion = await Agrupacion.create(
      { nombre:"pruebaagrupacion",
      descripcion:"una banda muy famosa de rock britanica"}
    )
    const response = await client.delete('/agrupaciones/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
