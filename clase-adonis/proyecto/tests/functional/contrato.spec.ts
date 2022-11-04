import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Contrato from 'App/Models/Contrato';

const datosBase = {
  id_agrupacion:1,
  id_evento:2
}

test.group('Contratos', () => {
  test('crear contratos', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/contratos')
      .json(datosBase)
    
    const new_user = await Contrato.query()
      .where('id', response.body().id).firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['id_agrupacion', 'id_evento', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver contratos', async ({ client, assert }) => {
    const nuevo_manager: Contrato = await Contrato.create(datosBase)
    const response = await client.get('/contratos/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'id_agrupacion', datosBase.id_agrupacion
    );
  });

  test('listar contratos', async ({ client }) => {
    const response = await client.get('/contratos')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar contratos', async ({ client, assert }) => {
    const nuevo_manager: Contrato = await Contrato.create(
      datosBase
    )
    const response = await client.put('/contratos/' + nuevo_manager.id)
      .json({
        id_agrupacion:2
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'id_agrupacion', 2
    );
  });

  test('eliminar contratos', async ({ client, assert }) => {
    const nuevo_manager: Contrato = await Contrato.create(datosBase)
    const response = await client.delete('/contratos/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
