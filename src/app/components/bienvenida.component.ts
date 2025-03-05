import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { usuario } from '../interfaces/usuario.interface';
@Component({
  selector: 'bienvenido',
  template: `
    <div
      class="flex  flex-col bg-white p-5 rounded-[12px] gap-4 items-center pl-9 justify-center sm:justify-start sm:flex-row"
    >
      <img src="perfil.png" alt="" />
      <div class="flex flex-col items-center sm:items-start">
        <h1 class="text-[16px] font-semibold ">
          Bienvenido -
          <span>{{ perfil.nombre }}</span>
        </h1>
        <small >{{ perfil.email }}</small>
      </div>
    </div>
  `,
})
export class Bienvenido {
  private serviceAuth = inject(AuthService);
  //public perfil = {};
  public perfil: Partial<usuario> = {};//interfaz

  //consumo de api
  constructor(){
    this.serviceAuth.profile().subscribe({
      //usuario: almacena respuesta del back
      next:(usuario)=>{
        this.perfil = usuario.usuario;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    })
  }

}
