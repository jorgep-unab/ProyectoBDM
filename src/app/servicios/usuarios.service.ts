import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interfaces'


@Injectable()
export class UsuariosService {

	private usuarios:any[] = [];
	
	constructor( private http: HttpClient ) {

		console.log("Servicio Importar Usuarios Listo");
		
											} 
	getAll():Observable<any>{
		return this.http.get('http://localhost/apibdm/usuarios/consultau.php');
							}


	public UsuarioSelecto: Usuario = {
		key:0,
		nombre:'',
		email:'',
		clave:'',
		permiso:''
									  };
	getONE(id):Observable<any>{
  		
		return this.http.get('http://localhost/apibdm/usuarios/traeunou.php?id='+id);
	}

	//BorraUsuario( usuario:Usuario, key$:string ):Observable<any>{
  	BorraUsuario( usuario:Usuario ):Observable<any>{
      	let headers = new HttpHeaders({
     	   'Content-type':'application/json'
     	 });
     	 //usuario.key = +key$;
     	 return this.http.post('http://localhost/apibdm/usuarios/eliminau.php', usuario,{ headers } );

		}


}