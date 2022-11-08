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
      {
        "id": 1,
        "nombre": "juan25",
        "correo": "juan15@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$BWw0WToVA2a0PT6SppgS1w$wVzzWlzX502/dM8/0lt2YGjvSy/xZ1SLeIN2/qLgl4c",
        "id_rol": null,
        "created_at": "2022-09-15T06:41:41.165-05:00",
        "updated_at": "2022-09-15T06:41:41.165-05:00",
        "id_rol2": null,
        "rol": null,
        "perfil": null
      },
      {
        "id": 2,
        "nombre": "hernando",
        "correo": "hernandonunez13@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$anGzXZaYkYQjSyg88bMvJg$FY+Kjjfbb/0+YST7i7+Q0TuNtYNZ5oKeYmbrvnCh/X0",
        "id_rol": null,
        "created_at": "2022-09-16T16:41:51.540-05:00",
        "updated_at": "2022-09-16T16:41:51.541-05:00",
        "id_rol2": null,
        "rol": null,
        "perfil": null
      },
      {
        "id": 3,
        "nombre": "hernando2",
        "correo": "hernandonunez13@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$/U221wMgBUvLEIx6PeF5PA$GlNeQbF3YzMvQe6QSNxP/XPibkzgEYRzBLzF9O/Pdxg",
        "id_rol": null,
        "created_at": "2022-09-16T17:00:40.526-05:00",
        "updated_at": "2022-09-16T17:00:40.526-05:00",
        "id_rol2": null,
        "rol": null,
        "perfil": null
      },
      {
        "id": 6,
        "nombre": "aaaaaa",
        "correo": "aaaaaaaa@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$/fZXmUibsT0jua8ZWv99mg$T6B+AYC8f4qdXTpySWYfp+23oPeYosPK9wyLThVt6v0",
        "id_rol": null,
        "created_at": "2022-09-23T16:55:08.785-05:00",
        "updated_at": "2022-09-23T16:55:08.785-05:00",
        "id_rol2": null,
        "rol": null,
        "perfil": null
      },
      {
        "id": 7,
        "nombre": "juanita",
        "correo": "juaniburiti@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$PxGMFpA6lvp9ikHjpg0N0Q$V/EvqQ7xmJ0HteIaxbQ91Ay9WMNTdcg3JbDRSThPNJM",
        "id_rol": null,
        "created_at": "2022-09-23T17:09:32.576-05:00",
        "updated_at": "2022-09-23T17:09:32.577-05:00",
        "id_rol2": null,
        "rol": null,
        "perfil": null
      },
      {
        "id": 10,
        "nombre": "example",
        "correo": "example@gmail.com",
        "contrasena": "$argon2id$v=19$t=3,m=4096,p=1$jcGlHo3ucTdqgMfumnTaFw$0DWj6J+9wVtUmz6iNP8SnEYWO4vuk8pIZKkfPAj9FP8",
        "id_rol": null,
        "created_at": "2022-10-07T01:27:43.112-05:00",
        "updated_at": "2022-10-07T01:27:43.112-05:00",
        "id_rol2": 1,
        "rol": {
          "id": 1,
          "nombre": "admin",
          "created_at": "2022-10-07T01:00:32.175-05:00",
          "updated_at": "2022-10-07T01:00:32.175-05:00"
        },
        "perfil": null
      }
    ])
  });

  test('actualizar usuarios', async ({ client, assert }) => {
    const nuevo_usuario: Usuario = await Usuario.create(
      { nombre: "pruebaUpdate", correo: "pruebaupdate@gmail.com", contrasena:"hola1234" }
    )
    const response = await client.put('/usuarios/' + nuevo_usuario.id)
      .json({
        correo: "modified@gmail.com",
        perfil: {
          id_usuario:nuevo_usuario.id,
          celular: "1234567890",
          url_instagram: "https://instagram.com"
        }
      }).loginAs(nuevo_usuario)
    await nuevo_usuario.delete();
    response.assertStatus(200)
    assert.propertyVal(
      response.body(),
      'correo', 'modified@gmail.com'
    );
  });

  test('eliminar usuarios', async ({ client, assert }) => {
    const nuevo_usuario: Usuario = await Usuario.create(
      { nombre: "pruebaDelete", correo: "pruebadelete@gmail.com", contrasena:"hola1234" }
    )
    const response = await client.delete('/usuarios/' + nuevo_usuario.id)
      .loginAs(nuevo_usuario)
    response.assertStatus(200)
    assert.isEmpty(response.body())
  });
})
