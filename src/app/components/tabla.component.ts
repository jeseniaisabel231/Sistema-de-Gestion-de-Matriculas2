import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Actions, Formulario, TituloForms } from './formulario.component';
import { TitleCasePipe } from '@angular/common';
import { estudiante } from '../interfaces/estudiante.interface';
import { materia } from '../interfaces/materia.interface';
import { matricula } from '../interfaces/matricula.interface';
import { FormGroup } from '@angular/forms';

export type DatosTabla = estudiante | materia | matricula;

@Component({
  selector: 'tabla',

  imports: [Formulario, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-auto w-full">
      <table
        class="text-[14px] mt-6 table-auto border-collapse border-y-[2px] border-[#C5C6C6] w-full"
      >
        <thead>
          <tr class="border-y-[2px] border-[#dff1fb] bg-[#dff1fb]">
            @for (columna of columnas(); track $index) {
            <th class="py-2 p-1 text-center">{{ columna | titlecase }}</th>
            }
            <th class="py-2 text-center p-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (fila of datosTabla(); track $index) {

          <tr class="font-normal">
            @for (columna of columnas(); track $index) {

            <td
              class="max-w-[150px] truncate whitespace-nowrap overflow-hidden p-1 text-center"
            >
              {{ fila[columna] }}
            </td>
            }

            <td class="whitespace-nowrap flex justify-center p-1">
              <button
                class="flex items-center justify-center w-[36px] h-[21px] bg-[#4ab763] rounded-[8px] mr-[3px]"
                (click)="verFormulario(fila)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="none"
                >
                  <path
                    d="M6.5 0A6.507 6.507 0 0 0 0 6.5C0 10.084 2.916 13 6.5 13S13 10.084 13 6.5 10.084 0 6.5 0Zm0 2.665a.845.845 0 1 1 0 1.69.845.845 0 0 1 0-1.69Zm1.56 7.345H5.2a.52.52 0 0 1 0-1.04h.91V6.11h-.52a.52.52 0 0 1 0-1.04h1.04a.52.52 0 0 1 .52.52v3.38h.91a.52.52 0 0 1 0 1.04Z"
                    fill="#3B3D3E"
                  />
                </svg>
              </button>
              <button
                class="flex items-center justify-center w-[36px] h-[21px] bg-[#F2FE11] rounded-[8px] mr-[3px]"
                (click)="editarFormulario(fila)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="none"
                >
                  <path
                    d="M3.1 6.896.054 12.365a.427.427 0 0 0 .582.581l5.445-3.01 4.567-4.56L7.635 2.37 3.1 6.896Zm-.923 4.266a.245.245 0 0 1-.338-.337L3.354 8.4l1.253 1.25-2.43 1.512ZM12.787 2.19 10.805.213a.73.73 0 0 0-1.032 0l-1.492 1.49 3.013 3.008 1.492-1.49a.729.729 0 0 0 0-1.03Z"
                    fill="#3B3D3E"
                  />
                </svg>
              </button>
              <button
                (click)="eliminarRegistro(fila.id)"
                class="flex items-center justify-center w-[36px] h-[21px] bg-[#fe4b4e] rounded-[8px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  fill="none"
                >
                  <path
                    d="M14.344 3h-3.188v-.75c0-.332-.14-.65-.389-.884A1.372 1.372 0 0 0 9.828 1H7.172c-.352 0-.69.132-.94.366a1.217 1.217 0 0 0-.388.884V3H2.656a.549.549 0 0 0-.375.146.486.486 0 0 0-.156.354c0 .133.056.26.156.354A.55.55 0 0 0 2.656 4h.565l.63 9.529C3.9 14.368 4.583 15 5.446 15h6.11c.867 0 1.537-.618 1.593-1.469L13.78 4h.565a.55.55 0 0 0 .375-.146.485.485 0 0 0 .156-.354.486.486 0 0 0-.156-.354.549.549 0 0 0-.375-.146Zm-7.95 10h-.019a.549.549 0 0 1-.37-.14.487.487 0 0 1-.161-.342l-.266-7a.484.484 0 0 1 .142-.359.551.551 0 0 1 .751-.025c.104.09.165.216.17.348l.265 7a.473.473 0 0 1-.142.359.532.532 0 0 1-.37.159Zm2.637-.5c0 .133-.056.26-.155.354A.549.549 0 0 1 8.5 13a.549.549 0 0 1-.376-.146.486.486 0 0 1-.155-.354v-7c0-.133.056-.26.155-.354A.549.549 0 0 1 8.5 5c.14 0 .276.053.376.146.1.094.155.221.155.354v7ZM10.094 3H6.906v-.75a.235.235 0 0 1 .077-.178A.264.264 0 0 1 7.172 2h2.656a.277.277 0 0 1 .189.072.246.246 0 0 1 .077.178V3Zm1.062 9.518a.487.487 0 0 1-.162.342.548.548 0 0 1-.369.14h-.02a.558.558 0 0 1-.37-.16.497.497 0 0 1-.141-.358l.265-7a.476.476 0 0 1 .17-.348.537.537 0 0 1 .38-.134.56.56 0 0 1 .37.159.498.498 0 0 1 .143.359l-.266 7Z"
                    fill="#3B3D3E"
                  />
                </svg>
              </button>

              <button></button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
    <!--va entre corchetes cuando se pasa una variable-->
    <formulario
      [(mostrarModal)]="mostrarModal"
      [titulo]="titulo()"
      [desabilitado]="desabilitado()"
      [acciones]="acciones()"
      [datosFormulario]="datosAlmacenados()"
      [servicioRegistrar]="servicioEliminar()"
      [idRegistro]="idAcciones()"
      (cambioEmitir)="registroActualizado($event)"
    ></formulario>
  `,
})
export class Tabla {
  public mostrarModal = signal<boolean>(false);
  public desabilitado = signal<boolean>(false);
  public titulo = input.required<TituloForms>();
  public idAcciones = signal<number>(1);

  //variable para ver los cambios de la tabla
  public cambioEliminar = output<number>(); 

  //datos que van a llegar a la tabla
  public datosTabla = model<DatosTabla[]>(); //input es tipo DatosTabla

  public datosAlmacenados = input<FormGroup>();

  public servicioEliminar = input<any>();

  public acciones = signal<Actions>('Actualizar');
  public columnas = computed(
    () => Object.keys(this.datosTabla()?.[0] ?? []) as (keyof DatosTabla)[]
  );

  //visualizado
  public verFormulario(datos: DatosTabla) {
    this.mostrarModal.set(true);
    this.desabilitado.set(true);
    this.acciones.set('Visualizar'); //se utiliza .set cuando se modifica el valor
    this.datosAlmacenados()?.patchValue(datos);
  }
  //editar
  public editarFormulario(datos: DatosTabla) {
    this.mostrarModal.set(true);
    this.desabilitado.set(false);
    this.acciones.set('Actualizar');
    this.datosAlmacenados()?.patchValue(datos);
    this.idAcciones.set(datos.id);
  }

  //funcion para eliminar un registro de materias, estudiante o matricula
  public eliminarRegistro(id: number) {
    if (confirm('Estas seguro de eliminar este registro')) {
      this.servicioEliminar()
        .eliminar(id)
        .subscribe({
          next: () => {
            
            this.cambioEliminar.emit(id)
            console.log('Eliminado con exito');
          },
        });
    }
  }

  //funcion que recibe el evento de cambioEmitir
  public registroActualizado(datosRecibidos: any) {
    this.datosTabla.update((datosActuales) =>
      datosActuales?.map((registro) =>
        registro.id === datosRecibidos.id ? datosRecibidos : registro
      )
    );
  }

  constructor() {
    console.log(this.datosTabla());
  }
}
