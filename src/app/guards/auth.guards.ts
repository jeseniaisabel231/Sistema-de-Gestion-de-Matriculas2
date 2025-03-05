import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
//proteger la ruta privadas
export function guardianAuthPrivada(){
    if (verificarAuth()) {
        return true
    }
    return inject(Router).createUrlTree(['/iniciar-sesion']) 
}
//proteger la ruta publicas
export function guardianAuthPublicas(){
    if (verificarAuth()) {
        return inject(Router).createUrlTree(['/modulo-materias']) 
    }
    return true
}
//vencimiento del token
function verificarAuth(){
    const token = localStorage.getItem('token') //OBTENER EL TOMEN DE LOCAL STORAGE, clave: 'token'
    if (!token) {
        return false   
    }
    const tokenDecodificado = JSON.parse(atob(token.split('.')[1]))//accede al segundo alemento del token
    return Date.now() < tokenDecodificado.exp*1000 //comparacion entre la fecha actual es anterior a la fecha de expiracion(creacion) del token
}