import { test } from '@japa/runner'
 
test.group('Usuarios', () => {
  test('ver usuario', async ({ client })=> {
    // Write your test here
    const response = await client.get('/usuarios/1')
     response.assertStatus(200)
    response.assertBodyContains([
      {
        "id": 1,
        "nombre": "juanita",
        "correo": "juanita.buriticaro@autonoma.edu.co",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$VYLW8L+2Mc720t39hdenuw$N69YqOLHBrl60+/dGQBdFLtX2p0/3lk1rPMm4VvUkKU",
        "id_rol": null,
        "created_at": "2022-09-17T00:07:27.000-05:00",
        "updated_at": "2022-09-17T00:07:27.000-05:00",
        "perfil": null
    }
    ])
  });
 
  test('listar usuarios', async ({ client })=> {
    // Write your test here
    const response = await client.get('/usuarios')
     response.assertStatus(200)
    response.assertBodyContains([
      {
          "id": 1,
          "nombre": "juanita",
          "correo": "juanita.buriticaro@autonoma.edu.co",
          "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$VYLW8L+2Mc720t39hdenuw$N69YqOLHBrl60+/dGQBdFLtX2p0/3lk1rPMm4VvUkKU",
          "id_rol": null,
          "created_at": "2022-09-17T00:07:27.000-05:00",
          "updated_at": "2022-09-17T00:07:27.000-05:00",
          "rol": null,
          "perfil": null
          
      }
  ])
  });
 
})
