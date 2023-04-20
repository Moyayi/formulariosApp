import { Component } from '@angular/core';

interface Menuitem {
  title : string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
    'li{ cursor: pointer}'
  ]
})
export class SideMenuComponent {

  public reactiveMenu : Menuitem[] = [
    {title: 'Básicos', route : './reactive/basic'},
    {title: 'Dinámicos', route : './reactive/dynamic'},
    {title: 'Switches', route : './reactive/switches'},
  ]

  public authMenu : Menuitem[] = [
    {title: 'Registro', route : './auth'},
  ]
}
