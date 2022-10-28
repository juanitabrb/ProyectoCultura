import { test } from '@japa/runner'
 
test.group('Programaciones', () => {
  test('ver programacion', async ({ client })=> {
    // Write your test here
    const response = await client.get('/programaciones/1')
    response.assertStatus(200)
    response.assertBodyContains(
      {
        "id": 1,
        "descripcion": "coral x acompañará concierto navideño de la sinfonica",
        "foto": null,
        "id_evento": 1,
        "created_at": "2022-10-27T21:35:24.000-05:00",
        "updated_at": "2022-10-27T21:35:24.000-05:00"
      }
    )
  });
 
  test('listar programaciones', async ({ client })=> {
    // Write your test here
    const response = await client.get('/programaciones')
    response.assertStatus(200)
    response.assertBodyContains([
      {
        "id": 1,
        "descripcion": "coral x acompañará concierto navideño de la sinfonica",
        "foto": null,
        "id_evento": 1,
        "created_at": "2022-10-27T21:35:24.000-05:00",
        "updated_at": "2022-10-27T21:35:24.000-05:00"
      }
  ])
  });
 
})