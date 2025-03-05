import { HttpClient } from '@angular/common/http'; //hacer peticiones http
import { inject, Injectable, signal } from '@angular/core';
import { materia } from '../interfaces/materia.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private urlBackend =
    'https://integrated-moina-jhonmata0427s-projects-e4972a05.koyeb.app/api/v1';
  private http = inject(HttpClient);

  //////////////////////////////////////////////////////////////////////////
  //metodo get no se necesita pasar parametros
  obtener() {
    //Si no hay datos en la cacheMaterias, se hace una peticion GET al backend
    return this.http.get<materia[]>(`${this.urlBackend}/materias`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  //   Authorization: Bearer ... → Se envía un token de autenticación para acceder a la API.
  // localStorage.getItem('token') → Obtiene el token almacenado en el navegador.
  //////////////////////////////////////////////////////////////////////////

  //endppoint para eliminar amteria
  eliminar(id: number) {
    return this.http.delete<void>(`${this.urlBackend}/materias/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  //endpoitn de actualizar materias
  actualizar(id: number, datos: materia) {
    return this.http.put<materia>(`${this.urlBackend}/materias/${id}`, datos, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  //endpoint de crear materia
  crear(materia: materia) {
    return this.http.post<materia>(`${this.urlBackend}/materias`, materia, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
