import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etapa } from '../interfaces/etapa.interfaces'


@Injectable()
export class EtapasService {

	private etapas:any[] = [];
	
	constructor( private http: HttpClient ) { } 

	getAll():Observable<any>{
		return this.http.get('http://localhost/apibdm/etapas/consultae.php');
							}


	public EtapaSelecto: Etapa = {
		key:0,
		nombre:''
									  };
	getONE(id):Observable<any>{
  		
		return this.http.get('http://localhost/apibdm/etapas/traeunoe.php?id='+id);
	}


}