import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmailService from 'App/Services/EmailService';

export default class EmailsController {
    public async index(ctx:HttpContextContract){
        let theEmailService:EmailService=new EmailService();
        theEmailService.sendEmail("juanita.buriticaro@autonoma.edu.co",
        "Nuevo Inicio de Sesión","Usted acaba de iniciar sesión en el sistema.")
    }
}
