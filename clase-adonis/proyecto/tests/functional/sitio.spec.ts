import { test } from '@japa/runner'
 
test.group('Sitios', () => {
  test('ver sitio', async ({ client })=> {
    // Write your test here
    const response = await client.get('/sitios/1')
    response.assertStatus(200)
    response.assertBodyContains([
      {
        "id": 1,
        "nombre": "teatro fundadores",
        "direccion": "avenida santander",
        "capacidad": 100,
        "created_at": "2022-10-27T21:22:13.000-05:00",
        "updated_at": "2022-10-27T21:22:13.000-05:00"
    }
    ])
  });
 
  test('listar sitios', async ({ client })=> {
    // Write your test here
    const response = await client.get('/sitios')
    response.assertStatus(200)
    response.assertBodyContains([
      {
        "id": 1,
        "nombre": "teatro fundadores",
        "direccion": "avenida santander",
        "capacidad": 100,
        "created_at": "2022-10-27T21:22:13.000-05:00",
        "updated_at": "2022-10-27T21:22:13.000-05:00"
    }
  ])
  });
 
})