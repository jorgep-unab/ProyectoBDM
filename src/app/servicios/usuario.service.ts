import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha512 } from 'js-sha512'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

	usuarioBaseURL:string = "http://localhost:8080/apibdm/usuarios";
  usuarioURL:string ="http://localhost:8080/apibdm/usuarios/creau.php";
  usuariModURL:string ="http://localhost:8080/apibdm/usuarios/modificau.php";

  constructor( private http:HttpClient ) {}


  NuevoUsuario( usuario:Usuario ):Observable<any> {

  	  let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

      //Encriptacion de la contraseña
      var temp = {
        nombre:usuario.nombre,
        email:usuario.email,
        clave:usuario.clave,
        permisos:usuario.permisos

      };

      temp.clave = sha512(temp.clave);

  	  return this.http.post(this.usuarioURL, temp, { headers } );

  }

  ModificaUsuario( usuario:Usuario, key$:string ):Observable<any>{
      //let url:"http://localhost/apibdm/usuarios/modificau.php";
  		let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

      var temp = {
        key:null,
        id:usuario.id,
        nombre:usuario.nombre,
        email:usuario.email,
        clave:usuario.clave,
        permisos:usuario.permisos
      };

      temp.clave = sha512(temp.clave);

      temp.key = +key$;
  	  //return this.http.put(this.usuariModURL, usuario, { headers } );
      return this.http.post('http://localhost:8080/apibdm/usuarios/modificau.php', temp,{ headers } );

  }

  GetUsuario( id:string ){
    let url = "http://localhost:8080/apibdm/usuarios/traeu.php";
    let headers = new HttpHeaders({
        'Content-type':'application/json'
      });

      //return this.http.get(this.usuarioURL, usuario, { headers } );
  }


}
