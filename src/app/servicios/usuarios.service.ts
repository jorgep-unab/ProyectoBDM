import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interfaces'


@Injectable()
export class UsuariosService {

	private usuarios:any[] = [];

	constructor( private http: HttpClient ) {
											}
	getAll():Observable<any>{
		return this.http.get('http://localhost:8080/apibdm/usuarios/consultau.php');
	}

	getONE(id):Observable<any>{

		return this.http.get('http://localhost:8080/apibdm/usuarios/traeunou.php?id='+id);
	}

  BorraUsuario( usuario:Usuario ):Observable<any>{
      	let headers = new HttpHeaders({
     	   'Content-type':'application/json'
     	 });
		  //usuario.key = +key$;
		  console.log(usuario);
     	 return this.http.post('http://localhost:8080/apibdm/usuarios/eliminau.php', usuario,{ headers } );

	}


}
