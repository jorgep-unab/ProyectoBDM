import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsuariosService {

	private usuarios:any[] = [];
	
	constructor( private http: HttpClient ) {

		console.log("Servicio listo para actuar");
		this.http.get('http://localhost/apibdm/usuarios/consultau.php')
		.subscribe(respuesta =>{
			console.log(respuesta); 	
		})
	}
}