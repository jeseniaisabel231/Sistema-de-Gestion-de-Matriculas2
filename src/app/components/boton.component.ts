import { Component } from '@angular/core';

@Component({
  selector: 'boton',
  template: `
    <button
      class="w-[125px] mt-1 p-2 rounded-[8px] bg-[#2872FF] text-white font-light text-[14px]"
      type="button"
    >
      + Crear Nuevo
    </button>
  `,
})
export class Boton {}
