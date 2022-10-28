import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Usuario from 'App/Models/Usuario';

test.group('Usuarios', () => {
  test('crear usuario', async ({ client, assert }) => {
    const user = await Usuario.find(2)
    let response: ApiResponse
    if (user) {
      response = await client.post('/usuarios')
        .json({
          nombre: "test",
          correo: "test@gmail.com",
          contrasena: "hola1234"
        }).loginAs(user)
    } else {
      response = await client.post('/usuarios')
        .json({
          nombre: "test",
          correo: "test@gmail.com",
          contrasena: "hola1234"
        })
    }
    const new_user = await Usuario.query()
      .where('correo', 'test@gmail.com').firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['nombre', 'correo', 'contrasena', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver usuario', async ({ client }) => {
    const user = await Usuario.find(2)
    let response
    if (user) {
      response = await client.get('/usuarios/1').loginAs(user)
    } else {
      response = await client.get('/usuarios/1')
    }
    response.assertStatus(200)
    response.assertBodyContains(
      {
      }
    )
  });

  test('listar usuarios', async ({ client }) => {
    // Write your test here
    const response = await client.get('/usuarios')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

})
