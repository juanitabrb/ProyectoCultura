import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Perfil from 'App/Models/Perfil';

const perfilBase = {
  id_usuario:2,
  celular: "1234567890",
  url_instagram: "https://"
}

test.group('Perfiles', () => {
  test('crear perfiles', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/perfiles')
      .json(perfilBase)
    
    const new_user = await Perfil.query()
      .where('id_usuario', perfilBase.id_usuario).firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['id_usuario', 'id', 'celular', 'url_instagram', 'created_at', 'updated_at']
    );

  });

  test('ver perfiles', async ({ client, assert }) => {
    const nuevo_manager: Perfil = await Perfil.create(perfilBase)
    const response = await client.get('/perfiles/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'celular', '1234567890'
    );
  });

  test('listar perfiles', async ({ client }) => {
    const response = await client.get('/perfiles')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar perfiles', async ({ client, assert }) => {
    const nuevo_manager: Perfil = await Perfil.create(
      perfilBase
    )
    const response = await client.put('/perfiles/' + nuevo_manager.id)
      .json({
        url_instagram:"https://instagram"
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'url_instagram', 'https://instagram'
    );
  });

  test('eliminar perfiles', async ({ client, assert }) => {
    const nuevo_manager: Perfil = await Perfil.create(perfilBase)
    const response = await client.delete('/perfiles/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
