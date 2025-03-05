import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { conferencista} from '../interfaces/conferencista.interface';


@Injectable({
  providedIn: 'root',
})
export class ConferencistasService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient);

  

  //////////////////////////////////////////////////////////////
  //metodo get para obtener conferencistas
  obtener() {
    
    return this.http
      .get<conferencista[]>(`${this.urlBackend}/conferencistas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }

  //////////////////////////////////////////////////////////////
  //metodo para eliminar un conferencista
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/conferencistas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      
  }

  //////////////////////////////////////////////////////////////////
  //metodo para actualizar conferencista
  actualizar(id: number, datos: conferencista) {
    return this.http
      .put<conferencista>(`${this.urlBackend}/conferencistas/${id}`, datos, {//datos: es el cuerpo de solictud PUT
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

  }

  //////////////////////////////////////////////////////////////////
  //metodo para crear conferencistas
  crear(conferencista: conferencista) {
    return this.http
      .post<conferencista>(`${this.urlBackend}/conferencistas`, conferencista, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }
}
