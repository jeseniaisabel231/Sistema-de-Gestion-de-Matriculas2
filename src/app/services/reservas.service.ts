import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { reserva } from '../interfaces/reserva.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient);

  

  /////////////////////////////////////////////
  //Metodo get no necesita parametros
  obtener() {
    
    return this.http
      .get<reserva[]>(`${this.urlBackend}/reservas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }) //Guardar las auditorios en cache
      
  }

  /////////////////////////////////////////////
  //Metodo delete para eliminar reservas
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/reservas/${id}`, {
        headers: { Authorizacion: `Bearer ${localStorage.getItem('token')}` },
      })
      
  }

  /////////////////////////////////////////////
  //endpoitn de actualizar reserva
  actualizar(id: number, datos: reserva) {
    return this.http
      .put<reserva>(`${this.urlBackend}/reservas/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }

  //endpoint de crear auditorio
    crear(reserva: reserva) {
      return this.http
        .post<reserva>(`${this.urlBackend}/reservas`, reserva, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
    }
}
