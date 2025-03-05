import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
  SimpleChanges,
  output,
  computed,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export type TituloForms = 'conferencista' | 'auditorio' | 'reserva'; //representacion de la clave
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';

@Component({
  selector: 'formulario',
  imports: [TitleCasePipe, ReactiveFormsModule],
  template: `
    @if (mostrarModal()) {

    <dialog
      #modal
      class="flex flex-col m-auto bg-white backdrop:backdrop-blur-xs rounded-[15px]"
    >
      <div
        class="flex  items-center bg-[#B6B6B6] p-3 rounded-t-[15px] justify-between px-7"
      >
        <h1 class="text-[20px] text-white font-medium">
          {{ acciones() }} {{ titulo() | titlecase }}
        </h1>
        <button (click)="close()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
          >
            <path
              d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0Zm4.165 13.077-1.088 1.088L10 11.088l-3.077 3.077-1.088-1.088L8.912 10 5.835 6.923l1.088-1.088L10 8.912l3.077-3.077 1.088 1.088L11.088 10l3.077 3.077Z"
              fill="#DC3545"
            />
          </svg>
        </button>
      </div>
      <form
        class="grid grid-cols-2 gap-x-4 text-[17px] py-4  font-normal px-7 gap-y-3"
        (ngSubmit)="onSubmit()"
        [formGroup]="datosFormulario()!"
      >
        @for (item of obtenerClave() ; track $index) {

        <label class="text-[#3B3D3E] flex flex-col font-medium" [for]="item">
          {{ item | titlecase }}
          @if(!desabilitado()){

          <input
            [type]="inputs[titulo()][item]"
            [id]="item"
            [name]="item"
            class="bg-white rounded-[6px] border border-[#C5C6C6] h-9 mb-2 last:mb-0 outline-[#3B3D3E] hover:border-[#3B3D3E] pl-2 placeholder:font-light placeholder:text-[15px]"
            [formControlName]="item"
            placeholder="Ingresar {{ item }}"
          />

          }@else {
          <span class="font-normal max-w-96">
            {{ datosFormulario()?.value[item] }}
          </span>
          }
        </label>
        }
      </form>

      @if (acciones() !== 'Visualizar') {

      <div class="flex justify-end gap-3 text-[16px] w-full px-7 py-4">
        <button
          class="bg-[#C5C6C6] rounded-[10px] p-2  text-[#3B3D3E] font-normal px-5"
          (click)="close()"
        >
          Cancelar
        </button>
        <button
          class="bg-[#181818] rounded-[10px] p-2 text-white px-5 font-normal disabled:opacity-85"
          (click)="onSubmit()"
          [disabled]="carga()"
        >
          @if(carga()){
          <svg
            class="animate-spin fill-[#ffffff] mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
            />
          </svg>
          }@else{

          {{ acciones() }}
          }
        </button>
      </div>
      }
    </dialog>

    }
  `,
})
export class Formulario {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input.required<TituloForms>();
  public acciones = input.required<Actions>();

  //variable de carga
  public carga = signal<boolean>(false);

  //variable para emitir el cambio
  public cambioEmitir = output<any>();

  //variable que almacena el mensaje del backend para formulario crear y editar

  public desabilitado = input<boolean>(false);

  //variable que almacena datos de auditorios\conferencistas\reservas
  public datosFormulario = input<FormGroup>(); //utilizar el atributo para enviar datos al formulario ES UN ATRIBUTO

  public servicioRegistrar = input<any>();

  public idRegistro = input<number>();

  public inputs: Record<TituloForms, Record<string, string>> = {
    conferencista: {
      //claves
      //valor
      nombre: 'text',
      apellido: 'text',
      cedula: 'number',
      genero: 'text',
      ciudad: 'text',
      direccion: 'text',
      fecha_nacimiento: 'date',
      telefono: 'number',
      email: 'email',
      empresa: 'text',
    },
    auditorio: {
      codigo: 'text',
      nombre: 'text',
      ubicacion: 'text',
      capacidad: 'number',
      descripcion: 'text',
    },
    reserva: {
      codigo: 'text',
      descripcion: 'text',
      id_conferencista: 'number',
      id_auditorio: 'number',
    },
  };

  //variable que obtenga las claves de los 'inputs'
  public obtenerClave = computed(() => Object.keys(this.inputs[this.titulo()]));

  public close() {
    this.mostrarModal.set(false);
  }
  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
  //funcion que verifica que haciion hace el boton
  public onSubmit() {
    console.log(this.datosFormulario()?.value);
    if (this.datosFormulario()?.invalid) {
      alert('Formulario inválido');
      return;
    }
    this.carga.set(true);
    //fun cion para crear un registro
    if (this.acciones() === 'Registrar') {
      this.servicioRegistrar()
        .crear(this.datosFormulario()?.value)
        .subscribe({
          next: (registroCreado: any) => {
            this.cambioEmitir.emit(registroCreado);
            alert('El registro se ha agregado correctamente');
            this.datosFormulario()?.reset(); //borra los datos almacenad en registrar formulario
            this.close();
          },
          error: ({ error }: { error: any }) => {
            const listaErrores = error.response?.errors ?? [];
            if (listaErrores.length) {
              alert(listaErrores.join('\n'));
            } else {
              console.log(error);
              alert(error.response); //error.response y este contiene el mensaje
            }
          },
        })
        .add(() => {
          this.carga.set(false);
        });
    } else {
      //funcion para actualizar registro
      this.servicioRegistrar()
        .actualizar(this.idRegistro(), this.datosFormulario()?.value)
        .subscribe({
          next: (registroActualizado: any) => {
            this.cambioEmitir.emit(registroActualizado);
            alert('El registro se ha actualizado correctamente');
            this.datosFormulario()?.reset(); //borra los datos almacenad en registrar formulario
            this.close();
          },
          error: ({ error }: { error: any }) => {
            alert(error.response);
          },
        })
        .add(() => {
          this.carga.set(false);
        });
    }
  }
}
