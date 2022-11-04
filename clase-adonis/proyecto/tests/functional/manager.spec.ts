import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Manager from 'App/Models/Manager';
import Usuario from 'App/Models/Usuario';

test.group('Managers', () => {
  test('crear manager', async ({ client, assert }) => {
    const user = await Usuario.find(2)
    let response: ApiResponse
    if (user) {
      response = await client.post('/managers')
        .json({
          nombre: "test",
          contacto: "1234567890",
        }).loginAs(user)
    } else {
      response = await client.post('/managers')
        .json({
          nombre: "test",
          contacto: "1234567890",
          id_agrupacion:1
        })
    }
    const new_user = await Manager.query()
      .where('nombre', 'test').firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['nombre', 'contacto', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver manager', async ({ client, assert }) => {
    const user = await Usuario.find(2)
    const nuevo_manager: Manager = await Manager.create(
      { nombre: "test",
      contacto: "1234567890",
      id_agrupacion: 1 }
    )
    let response
    if (user) {
      response = await client.get('/managers/'+nuevo_manager.id).loginAs(user)
    } else {
      response = await client.get('/managers/'+nuevo_manager.id)
    }
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'contacto', '1234567890'
    );
  });

  test('listar managers', async ({ client }) => {
    // Write your test here
    const response = await client.get('/managers')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar managers', async ({ client, assert }) => {
    const nuevo_manager: Manager = await Manager.create(
      { nombre: "test",
      contacto: "1234567890",
      id_agrupacion: 1 }
    )
    const response = await client.put('/managers/' + nuevo_manager.id)
      .json({
        contacto: "0987654321",
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'contacto', '0987654321'
    );
    assert.property(response.body(),'id_agrupacion')
  });

  test('eliminar managers', async ({ client, assert }) => {
    const nuevo_manager: Manager = await Manager.create(
      { nombre: "test",
      contacto: "1234567890",
      id_agrupacion: 1 }
    )
    const response = await client.delete('/managers/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
