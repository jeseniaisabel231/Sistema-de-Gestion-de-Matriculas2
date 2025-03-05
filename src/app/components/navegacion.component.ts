import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'navegacion',
  imports: [NgClass, RouterLink],
  template: `
    <!--4. mostrar(true) indica los cambios; mostrar(false) pone esos cambios-->
    <aside
      [ngClass]="{
        'animate-activa': mostrar(),
        'animate-inactiva': !mostrar()
      }"

      class="flex flex-col pr-8 border-r border-[#DEE0E2] h-full fixed lg:static bg-[#f3f5f7] min-w-80"
    >
      <nav>
        <ul class="flex flex-col gap-3 pl-8 pt-7 text-[14px] text-[#3B3D3E] ">
          <li class="flex">
            <a
              class="flex items-center gap-2 text-[#3B3D3E] hover:text-[#003BE4] font-normal transition-colors duration-initial hover:bg-[#CFE9FF] p-2 rounded-[12px] w-full"
              routerLink="/modulo-materias"
              [ngClass]="{
                'bg-[#CFE9FF] text-[#003BE4]':
                  rutaActiva() === 'modulo-materias',
                'text-[#3B3D3E]': rutaActiva() !== 'modulo-materias'
              }"
            >
              <svg
                class="w-8 h-5 stroke-current transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
              >
                <path
                  d="M3 2.84615V2.38462C3.00115 2.01772 3.15956 1.66616 3.44061 1.40672C3.72167 1.14729 4.10253 1.00107 4.5 1H11.5C11.8975 1.00107 12.2783 1.14729 12.5594 1.40672C12.8404 1.66616 12.9988 2.01772 13 2.38462V13L10.5 11.1538"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.42105 3H2.57895C2.16056 3.00111 1.75965 3.15318 1.46381 3.42299C1.16796 3.6928 1.00121 4.05843 1 4.44V15L6 11.16L11 15V4.44C10.9988 4.05843 10.832 3.6928 10.5362 3.42299C10.2403 3.15318 9.83944 3.00111 9.42105 3Z"
                  stroke-linejoin="round"
                />
              </svg>
              Módulo Materias
            </a>
          </li>

          <li class="flex">
            <a
              class="flex items-center gap-2 text-[#3B3D3E] hover:text-[#003BE4] font-normal transition-colors duration-initial  hover:bg-[#CFE9FF] p-2 rounded-[12px] w-full"
              routerLink="/modulo-estudiantes"
              [ngClass]="{
                'bg-[#CFE9FF] text-[#003BE4]':
                  rutaActiva() === 'modulo-estudiantes',
                'text-[#3B3D3E]': rutaActiva() !== 'modulo-estudiantes'
              }"
            >
              <svg
                class="w-8 h-5 stroke-current transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M15.992 4C15.8814 5.69458 14.7422 7 13.5 7C12.2578 7 11.1167 5.695 11.008 4C10.8947 2.23708 12.0036 1 13.5 1C14.9964 1 16.1053 2.26917 15.992 4Z"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 10C10.2845 10 7.67319 11.4451 7.019 14.2594C6.93233 14.6317 7.15025 15 7.50735 15H18.4931C18.8501 15 19.0668 14.6317 18.9814 14.2594C18.3272 11.4 15.7159 10 13 10Z"
                  stroke-miterlimit="10"
                />
                <path
                  d="M6.99376 4.49741C6.90574 5.89741 5.98861 7 5 7C4.01139 7 3.09276 5.89785 3.00624 4.49741C2.91633 3.04095 3.80901 2 5 2C6.19099 2 7.08367 3.06767 6.99376 4.49741Z"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 9.64002C7.27389 9.17775 6.47417 9 5.62657 9C3.53473 9 1.51933 10.4449 1.01447 13.2594C0.948098 13.6316 1.11625 14 1.39141 14H5.90816"
                  stroke-linecap="round"
                />
              </svg>
              Módulo Estudiantes
            </a>
          </li>

          <li class="flex ">
            <a
              class="flex items-center gap-2 text-[#3B3D3E] hover:text-[#003BE4] font-normal transition-colors duration-initial hover:bg-[#CFE9FF] p-2 rounded-[12px] w-full"
              routerLink="/modulo-matriculas"
              [ngClass]="{
                'bg-[#CFE9FF] text-[#003BE4]':
                  rutaActiva() === 'modulo-matriculas',
                'text-[#3B3D3E]': rutaActiva() !== 'modulo-matriculas'
              }"
            >
              <svg
                class="w-8 h-5 stroke-current transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
              >
                <path
                  d="M15.7971 5H2.20292C1.53856 5 1 5.5049 1 6.12773V13.8723C1 14.4951 1.53856 15 2.20292 15H15.7971C16.4614 15 17 14.4951 17 13.8723V6.12773C17 5.5049 16.4614 5 15.7971 5Z"
                  stroke-linejoin="round"
                />
                <path d="M4.33333 1H13.6667H4.33333ZM3 3H15H3Z" fill="black" />
                <path
                  d="M4.33333 1H13.6667M3 3H15"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
              Módulo Matriculas
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
})
export class Navegacion {
  //3. recibe el valor true o false, que capto en el paso 2 a traves de la propiedad input
  public mostrar = input<boolean>();

  //para mantener el color de cada opcion del menu
  //servicio de ruta
  public servicioRuta = inject(ActivatedRoute);

  public rutaActiva = computed(()=>this.servicioRuta.snapshot.url[0].path);
  constructor() {
    console.log(this.rutaActiva());
  }
}
