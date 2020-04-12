import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UsuariosService {

	private usuarios:any[] = [];
	
	constructor( private http: HttpClient ) {

		console.log("Servicio listo para actuar");
		
	} 
	getAll():Observable<any>{
		return this.http.get('http://localhost/apibdm/usuarios/consultau.php');
	}
}