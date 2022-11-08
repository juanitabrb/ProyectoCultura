import { ApiResponse } from '@japa/api-client/build/src/Response';
import { test } from '@japa/runner'
import Categoria from 'App/Models/Categoria';

test.group('Categorias', () => {
  test('crear categorias', async ({ client, assert }) => {
    let response: ApiResponse
    response = await client.post('/categorias')
      .json({
        nombre:"pruebaCategoria",
      })
    
    const new_user = await Categoria.query()
      .where('nombre', 'pruebaCategoria').firstOrFail()
    await new_user.delete()
    response.assertStatus(200)
    assert.onlyProperties(
      response.body(),
      ['nombre', 'id', 'created_at', 'updated_at']
    );

  });

  test('ver manager', async ({ client, assert }) => {
    const nuevo_manager: Categoria = await Categoria.create(
      { nombre:"pruebaCategoria"}
    )
    const response = await client.get('/categorias/'+nuevo_manager.id)
    nuevo_manager.delete()
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'nombre', 'pruebaCategoria'
    );
  });

  test('listar categorias', async ({ client }) => {
    const response = await client.get('/categorias')
    response.assertStatus(200)
    response.assertBodyContains([
    ])
  });

  test('actualizar categorias', async ({ client, assert }) => {
    const nuevo_manager: Categoria = await Categoria.create(
      { nombre:"pruebaCategoria"}
    )
    const response = await client.put('/categorias/' + nuevo_manager.id)
      .json({
        nombre:"categoriamodificada"
      })
    await nuevo_manager.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'nombre', 'categoriamodificada'
    );
  });

  test('eliminar categorias', async ({ client, assert }) => {
    const nuevo_manager: Categoria = await Categoria.create(
      { nombre:"pruebaCategoria"}
    )
    const response = await client.delete('/categorias/' + nuevo_manager.id)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
