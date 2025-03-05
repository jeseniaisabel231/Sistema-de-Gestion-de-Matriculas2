import { HttpClient } from '@angular/common/http'; //hacer peticiones http
import { inject, Injectable, signal } from '@angular/core';
import { auditorio } from '../interfaces/auditorio.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditoriosService {
  private urlBackend =
    'https://sharp-lisa-jhonmata0427s-projects-a5f958cc.koyeb.app/api/v1';
  private http = inject(HttpClient);

  //////////////////////////////////////////////////////////////////////////
  //metodo get no se necesita pasar parametros
  obtener() {
    //Si no hay datos en la cacheAuditorios, se hace una peticion GET al backend
    return this.http.get<auditorio[]>(`${this.urlBackend}/auditorios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  //   Authorization: Bearer ... → Se envía un token de autenticación para acceder a la API.
  // localStorage.getItem('token') → Obtiene el token almacenado en el navegador.
  //////////////////////////////////////////////////////////////////////////

  //endppoint para eliminar amteria
  eliminar(id: number) {
    return this.http.delete<void>(`${this.urlBackend}/auditorios/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  //endpoitn de actualizar auditorios
  actualizar(id: number, datos: auditorio) {
    return this.http.put<auditorio>(`${this.urlBackend}/auditorios/${id}`, datos, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  //endpoint de crear auditorio
  crear(auditorio: auditorio) {
    return this.http.post<auditorio>(`${this.urlBackend}/auditorios`, auditorio, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
