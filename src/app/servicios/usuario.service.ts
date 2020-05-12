import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

	usuarioBaseURL:string = "http://localhost/apibdm/usuarios";
  usuarioURL:string ="http://localhost/apibdm/usuarios/creau.php";
  usuariModURL:string ="http://localhost/apibdm/usuarios/modificau.php";

  constructor( private http:HttpClient ) {}
  

  NuevoUsuario( usuario:Usuario ):Observable<any> {
  	  
  	  let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

  	  return this.http.post(this.usuarioURL, usuario, { headers } );
  	  
  	  console.log('Viene de Nuevousuario');
  	  console.log(JSON.stringify(usuario));

  }

  ModificaUsuario( usuario:Usuario, key$:string ):Observable<any>{
      //let url:"http://localhost/apibdm/usuarios/modificau.php";
  		let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });
      usuario.key = +key$;
  	  //return this.http.put(this.usuariModURL, usuario, { headers } );
      return this.http.post('http://localhost/apibdm/usuarios/modificau.php', usuario,{ headers } );
  	  
  }

  GetUsuario( id:string ){
    let url = "http://localhost/apibdm/usuarios/traeu.php";
    let headers = new HttpHeaders({
        'Content-type':'application/json'
      });

      //return this.http.get(this.usuarioURL, usuario, { headers } );
  }


}






