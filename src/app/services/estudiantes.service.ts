import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { estudiante } from '../interfaces/estudiante.interface';
import { of, tap } from 'rxjs';
import { materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient);

  

  //////////////////////////////////////////////////////////////
  //metodo get para obtener estudiantes
  obtener() {
    
    return this.http
      .get<estudiante[]>(`${this.urlBackend}/estudiantes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }

  //////////////////////////////////////////////////////////////
  //metodo para eliminar un estudiante
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/estudiantes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      
  }

  //////////////////////////////////////////////////////////////////
  //metodo para actualizar estudiante
  actualizar(id: number, datos: estudiante) {
    return this.http
      .put<estudiante>(`${this.urlBackend}/estudiantes/${id}`, datos, {//datos: es el cuerpo de solictud PUT
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

  }

  //////////////////////////////////////////////////////////////////
  //metodo para crear estudiantes
  crear(estudiante: estudiante) {
    return this.http
      .post<estudiante>(`${this.urlBackend}/estudiantes`, estudiante, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }
}
