import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Boton } from '../components/boton.component';
import { Navegacion } from '../components/navegacion.component';
import { Bienvenido } from '../components/bienvenida.component';
import { Formulario } from '../components/formulario.component';
import { Tabla } from '../components/tabla.component';
import { MatriculasService } from '../services/matriculas.service';
import { matricula } from '../interfaces/matricula.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Carga } from '../components/carga.component';

@Component({
  imports: [Navegacion, Bienvenido, Formulario, Tabla, FormsModule, Carga],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--min-h-screen: como minimo ocupe la pantalla completa, si sobre pasa es emimnimo pararece el scrollbar-->
    <main class="flex max-w-screen min-h-screen flex-col">
      <header
        class="flex w-full p-4  gap-5 items-center border-b pr-5 border-[#DEE0E2] justify-between pl-8 "
      >
        <div class="flex items-center gap-4">
          <!-- 2. evento click que alterna el valor de mostrar entre true y false, cuando se hace clik en el "boton", este cambia de valor-->
          <button type="button" (click)="mostrar.set(!mostrar())">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
            >
              <path
                d="M0 10H15V8.3332H0V10ZM0 5.8332H15V4.1668H0V5.8332ZM0 0V1.6668H15V0H0Z"
                fill="#3B3D3E"
              />
            </svg>
          </button>
          <img class="w-10 h-10" src="logo.png" alt="Logo de matriculas" />
          <h1 class="font-semibold text-[16px] text-[#3B3D3E] hidden sm:block">
            Sistema de Gestión de Matriculas
          </h1>
        </div>
        <div class="flex  gap-4">
          <img src="perfil.png" alt="" />
          <button
            class="w-[60px] mt-1  rounded-[8px] bg-[#f24a4a] text-white font-light text-[13px]"
            type="button"
            (click)="salir()"
          >
            Salir
          </button>
        </div>
      </header>
      <div class="flex flex-row bg-[#F3F5F7] flex-1">
        <!--[mostrar] es puente que envia el valor obtenido de "mostrar", puente entre header y nav, con esto no se mostrar la barra por que es false -->
        <!--Esto permite que el componente hijo acceda y utilice el valor de mostrar para controlar su comportamiento o apariencia.-->
        <navegacion [mostrar]="mostrar()"></navegacion>

        <section class="flex flex-col p-5 mt-2 gap-3 text-[#3B3D3E] w-full">
          <bienvenido></bienvenido>
          <div
            class="flex flex-col bg-white p-5 pl-9 rounded-[12px] flex-1 text-[23px] font-bold"
          >
            <h1 class="">Matriculas</h1>
            <button
              class="w-[125px] mt-1 p-2 rounded-[8px] bg-[#2872FF] text-white font-light text-[14px]"
              (click)="mostrarModal.set(true)"
            >
              + Crear Nuevo
            </button>

            <formulario
              [(mostrarModal)]="mostrarModal"
              titulo="matricula"
              acciones="Registrar"
              [datosFormulario]="datosMatriculas"
              [servicioRegistrar]="serviceMatricula"
              (cambioEmitir)="datosCreados($event)"
            ></formulario>

            <div
              class="flex mt-5 sm:flex-row sm:items-center w-full sm:w-80 bg-[#F3F5F7] border border-[#eaeaea] rounded-[10px] p-2"
            >
              <svg
                class="text-[#3B3D3E]"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
              >
                <path
                  d="M16.2188 15.7188L11.6142 10.8711C12.3563 9.79771 12.7554 8.50407 12.7542 7.17656C12.7542 3.70195 10.0686 0.875 6.76773 0.875C3.46686 0.875 0.78125 3.70195 0.78125 7.17656C0.78125 10.6512 3.46686 13.4781 6.76773 13.4781C8.02886 13.4794 9.25782 13.0592 10.2775 12.2781L14.8828 17.125L16.2188 15.7188ZM6.76773 11.4879C5.95756 11.488 5.16557 11.2351 4.49191 10.7614C3.81824 10.2877 3.29317 9.61425 2.9831 8.82638C2.67303 8.0385 2.59188 7.17152 2.74992 6.33509C2.90796 5.49866 3.29808 4.73035 3.87096 4.12733C4.44384 3.5243 5.17373 3.11364 5.96834 2.94728C6.76294 2.78093 7.58657 2.86635 8.33506 3.19274C9.08354 3.51913 9.72327 4.07183 10.1733 4.78095C10.6234 5.49007 10.8636 6.32375 10.8635 7.17656C10.8622 8.31959 10.4303 9.41541 9.66247 10.2236C8.89464 11.0319 7.85361 11.4865 6.76773 11.4879Z"
                  fill="#3B3D3E"
                />
              </svg>
              <input
                [(ngModel)]="busqueda"
                class=" flex-1 bg-transparent text-[14px] font-normal text-[#3B3D3E] outline-none pl-2"
                type="search"
                type="search"
                placeholder="Buscar"
                id="search"
                name="search"
              />
            </div>
            @if (carga()) {
            <carga></carga>
            }@else {

            <tabla
              titulo="matricula"
              [datosTabla]="datosBuscados()"
              [datosAlmacenados]="datosMatriculas"
              [servicioEliminar]="serviceMatricula"
              (cambioEliminar)="datosEliminados($event)"
            ></tabla>
            }
          </div>
        </section>
      </div>
    </main>
  `,
})
export class MatriculasPage {
  //1.false: menu de navegacion oculto
  //Variable que hara que la barra de navegacion se muestre o no se muestre

  public mostrar = signal<boolean>(true);
  public mostrarModal = signal<boolean>(false);

  //estado de carga
  public carga = signal<boolean>(true);

  public serviceMatricula = inject(MatriculasService);

  public busqueda = signal<string>('');

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<matricula[]>(() => {
    const datosMatriculas = this.matriculas();
    if (this.busqueda() !== '') {
      return datosMatriculas.filter((registro) =>
        Object.values(registro).some((valor) =>
          valor.toString().toLowerCase().includes(this.busqueda().toLowerCase())
        )
      );
    }
    return datosMatriculas;
  });

  public matriculas = signal<matricula[]>([]);

  //Informacion que aparecera en los iconos, para ver, editar y crear
  public datosMatriculas = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    descripcion: new FormControl('', [
      Validators.required,
    ]),
    id_estudiante: new FormControl('', [
      Validators.required,
    ]),
    id_materia: new FormControl('', [
      Validators.required, 
      ]),
  });

  //funcion para recibir datos creados
  public datosCreados(datoCreado: matricula) {
    this.matriculas.update((matriculasActuales) => [
      ...matriculasActuales,
      datoCreado,
    ]);
  }

  //funcion que recibe los datos de eliminados
  public datosEliminados(idEliminado: number) {
    this.matriculas.update((datos) =>
      datos?.filter((registro) => registro.id !== idEliminado)
    );
  }

  ///////////////////////////////////////////////////////
  //consumo de endpoint de matriculas
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.serviceMatricula
      .obtener()
      .subscribe({
        next: (matricula:any) => {
          this.matriculas.set(matricula);
          console.log(matricula);
          this.datosBuscados.set(matricula);
        },
      })
      .add(() => {
        this.carga.set(false);
      }); //carga de datos;
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.mostrar.set(!result.matches);
      });
  }
  salir() {
    localStorage.removeItem('token'); //remuevo el token para salir de secion
    this.router.navigate(['/iniciar-sesion']); // Redirigir al login
  }
}
