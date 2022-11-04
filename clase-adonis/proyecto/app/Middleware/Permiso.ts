import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Permiso {
  public async handle({auth, request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await auth.user?.load("rol")
    await auth.user?.rol.load("permisos")
    console.log(auth.user?.rol.permisos)
    let url = request.url()
    let urlParts = url.split('/')
    urlParts.forEach(element =>{
      if (element.match('\\d')) {
        url = url.replace(`/${element}`, '/?')
      }
    })
    console.log("url --> ", url)
    const metodo = request.method();
    console.log("metodo --> ", metodo)
    let acceptMethod = false;
    auth.user?.rol.permisos.forEach((permiso)=>{
      if (permiso.url=== url && permiso.metodo===metodo && !acceptMethod) {
        acceptMethod = true;
        console.log("Tiene el permiso")
      }
    })

    if (!acceptMethod) {
      return response.unauthorized('No tiene acceso a esta ruta');
    }

    await next()
  }
}
