import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { usuario } from '../interfaces/usuario.interface';

interface respuestaLogin {
  response: string;
  token: string;
}
interface respuestaProfile {
  response: string;
  usuario: Partial<usuario> //llama a la interfaz de usuario.interface.ts
  //partial: hace que todos los campos sena opcional, y se rellenen los necesario
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient); //injectar la dependendia de httpClient (llamar al servicio)

  //endpoint login
  login(email: string, password: string) {
    //metodo post: enviar datos
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/auth/login`, {
        email,
        password,
      }) 
      .pipe(tap((response) => localStorage.setItem('token', response.token)));
  }

   //endopoint de perfil
   profile(){
    //metodo get para obtener los datos
    return this.http.get<respuestaProfile>(`${this.urlBackend}/auth/profile`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}` }}) //clave: 'token'
    
   }
}
