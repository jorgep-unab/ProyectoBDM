import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crop } from '../interfaces/crop.interfaces'


@Injectable()
export class CropsService {

	private Crops:any[] = [];

	constructor( private http: HttpClient ) { }
	//NOTE:CAMBIAR EL PUERTO SEGUN SE NECESITE

	getAll():Observable<any>{
		return this.http.get('http://localhost:8080/apibdm/crops/consultac.php');
	}


	public CropSelecto: Crop = {
		key:0,
		nombre:'',
		fecha_creacion: new Date()
	};
	getONE(id):Observable<any>{

		return this.http.get('http://localhost:8080/apibdm/crops/traeunoc.php?id='+id);
	}

	 BorraCrop( crop:Crop ):Observable<any>{
      	let headers = new HttpHeaders({
     	   'Content-type':'application/json'
     	 });
     	 //usuario.key = +key$;
     	 return this.http.post('http://localhost:8080/apibdm/crops/eliminac.php', crop,{ headers } );

		}


}
