import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { matricula } from '../interfaces/matricula.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient);

  

  /////////////////////////////////////////////
  //Metodo get no necesita parametros
  obtener() {
    
    return this.http
      .get<matricula[]>(`${this.urlBackend}/matriculas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }) //Guardar las materias en cache
      
  }

  /////////////////////////////////////////////
  //Metodo delete para eliminar matriculas
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/matriculas/${id}`, {
        headers: { Authorizacion: `Bearer ${localStorage.getItem('token')}` },
      })
      
  }

  /////////////////////////////////////////////
  //endpoitn de actualizar matricula
  actualizar(id: number, datos: matricula) {
    return this.http
      .put<matricula>(`${this.urlBackend}/matriculas/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }

  //endpoint de crear materia
    crear(matricula: matricula) {
      return this.http
        .post<matricula>(`${this.urlBackend}/matriculas`, matricula, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
    }
}
