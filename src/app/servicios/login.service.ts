import { Injectable } from '@angular/core';
import {Usuario} from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuario:Usuario;
  constructor() { }

  public getUsuario():Usuario{
  	return this.usuario;
  }

  public loguear(correo:string, clave:string):boolean{
  	this.usuario = {
  		correo:correo,
  		clave:clave,
  		nombre:'Jorge Perez'
  	};
  	return true;
  }
  public cerrarSession(){
  	this.usuario = null;
  }
}
