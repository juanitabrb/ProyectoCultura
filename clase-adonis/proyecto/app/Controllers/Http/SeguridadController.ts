// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import ApiToken from 'App/Models/ApiToken';
import Usuario from "App/Models/Usuario";
import EmailService from 'App/Services/EmailService';
import PlantillaSeguridad from 'App/Services/EmailsTemplates/PlantillaSeguridad';

export default class SeguridadsController {
    async login({ auth, request, response }) {
        const correo = request.input('correo')
        const contrasena = request.input('contrasena')
        const el_usuario = await Usuario.query()
            .where('correo', correo)
            .firstOrFail()
        if (await Hash.verify(el_usuario.contrasena, contrasena)) {
            //Generación token
            const token = await auth.use('api').generate(el_usuario, {
                expiresIn: '60 mins'
            })
            let plantilla_correo: PlantillaSeguridad = new PlantillaSeguridad()
            let html = plantilla_correo.newLogin()
            let el_servicio_correo: EmailService = new EmailService();
            el_servicio_correo.sendEmail(correo, "Nuevo Inicio de Sesión", html)
            //Obtiene los datos correspondientes a la relación
            await el_usuario.load("rol");
            el_usuario.contrasena = ""
            return {
                "token": token,
                "usuario": el_usuario
            };
        } else {
            return response.unauthorized('Credenciales inválidas')
        }
    }
    async logout({ auth }) {
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }
    async forgotPassword({ auth, request }) {
        let respuesta: Object = {}
        const correo = request.input('correo')
        const el_usuario = await Usuario.query()
            .where('correo', correo)
            .firstOrFail()
        if (!el_usuario) {
            respuesta = {
                "status": "error",
                "message": "El correo no está registrado en la plataforma"
            }
        } else {
            const token = await auth.use('api').generate(el_usuario, {
                expiresIn: '60 mins'
            })
            let plantilla_correo: PlantillaSeguridad = new PlantillaSeguridad()
            let html = plantilla_correo.forgotPassword(token.token)
            let el_servicio_correo: EmailService = new EmailService();
            el_servicio_correo.sendEmail(correo, "Solicitud restablecimiento de contraseña", html)
            respuesta = {
                "status": "success",
                "message": "Revisar el correo"
            }
        }
        return respuesta;
    }
    async resetPassword({ auth, request }) {
        let respuesta: Object = {}
        try {
            await auth.use('api').authenticate()
            auth.use('api').isAuthenticated
        } catch (error) {
            return {
                status: "error",
                message: "Token corrupto"
            };
        }
        const el_usuario = await Usuario.findBy('correo', auth.user!.correo);
        if (!el_usuario) {
            respuesta = {
                status: "error",
                message: "Este usuario no existe"
            }
        } else {
            el_usuario.contrasena = request.input('contrasena');
            await el_usuario.save();
            await auth.use('api').revoke();
            respuesta = {
                status: "success",
                message: "La contraseña se ha restaurado correctamente"
            };
        }
        return respuesta;
    }
}
