import { Component } from '@angular/core';
@Component({
  selector: 'barra',
  template: `
    <input
      class="border-[#eaeaea] border p-2 bg-[#F3F5F7] rounded-[10px] outline-[#d0d0d0] text-[14px] font-normal w-80 text-[#3B3D3E]"
      type="search"
      placeholder="Buscar"
      id="search"
      name="search"
    />
  `,
})
export class Barra {}
