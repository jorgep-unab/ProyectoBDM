import { Component,OnInit } from '@angular/core';
import {LoginService} from './servicios/login.service';
import {Usuario} from './clases/usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectobdmweb';

  constructor(private loginService:LoginService){

  }
  public getUsuarioLogueado():Usuario{
  	return this.loginService.getUsuario();
  }
}
