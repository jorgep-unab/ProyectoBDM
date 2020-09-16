import { Injectable, Output, EventEmitter } from '@angular/core';
import {Usuario} from '../clases/usuario';
import { UsuariosService } from '../servicios/usuarios.service';
import { sha512 } from 'js-sha512'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private usuariosService:UsuariosService,
              private cookieService: CookieService) { }

  @Output() logeado: EventEmitter<any> = new EventEmitter<any>();

  getEmitter(){

    return this.logeado;

  }

  public loguear(correo:string, clave:string){

      this.usuariosService.getAll().subscribe(respuesta=>{

       respuesta.forEach(us => {

        if (us.email==correo && us.clave==sha512(clave)) {

          this.cookieService.set( 'Usuario', us.nombre, 1 );
          this.cookieService.set( 'UsuarioId', us.id, 1 );
          this.cookieService.set( 'Permisos', us.permisos, 1 );

          this.logeado.emit(true);

        }

      });


    });

  }

  public cerrarSession(){
    this.logeado.emit(false);
    this.cookieService.deleteAll();

  }
}
