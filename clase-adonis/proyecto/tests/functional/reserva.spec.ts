import { test } from '@japa/runner'
 
test.group('Reservas', () => {
  test('ver reserva', async ({ client })=> {
    // Write your test here
    const response = await client.get('/reservas/1')
    response.assertStatus(200)
    response.assertBodyContains(
      {
        "id": 1,
        "id_usuario": 1,
        "id_evento": 1,
        "created_at": "2022-10-27T21:36:28.000-05:00",
        "updated_at": "2022-10-27T21:36:28.000-05:00"
      }
    )
  });
 
  test('listar reservas', async ({ client })=> {
    // Write your test here
    const response = await client.get('/reservas')
    response.assertStatus(200)
    response.assertBodyContains([
      {
        "id": 1,
        "id_usuario": 1,
        "id_evento": 1,
        "created_at": "2022-10-27T21:36:28.000-05:00",
        "updated_at": "2022-10-27T21:36:28.000-05:00"
      }
  ])
  });
 
})


