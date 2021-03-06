import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etapa } from '../interfaces/etapa.interfaces'


@Injectable()
export class EtapasService {

	private etapas:any[] = [];

	constructor( private http: HttpClient ) { }

	getAll():Observable<any>{
		return this.http.get('http://localhost:8080/apibdm/etapas/consultae.php');
	}


	public EtapaSelecto: Etapa = {
		id:0,
		nombre:''
	};
	getONE(id):Observable<any>{

		return this.http.get('http://localhost:8080/apibdm/etapas/traeunoe.php?id='+id);
	}

	 BorraEtapa( etapa:Etapa ):Observable<any>{
      	let headers = new HttpHeaders({
     	   'Content-type':'application/json'
     	 });
     	 //usuario.key = +key$;
     	 return this.http.post('http://localhost:8080/apibdm/etapas/eliminae.php', etapa,{ headers } );

		}


}
