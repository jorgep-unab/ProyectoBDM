import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Etapa } from '../interfaces/etapa.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {
  //NOTE: SE ASIGNÓ EL PUERTO PARA QUE DETECTE LAS API
	etapaBaseURL:string = "http://localhost:8080/apibdm/etapas";
  etapaURL:string ="http://localhost:8080/apibdm/etapas/creae.php";
  etapaModURL:string ="http://localhost:8080/apibdm/etapas/modificae.php";

  constructor( private http:HttpClient ) {}


  NuevaEtapa( etapa:Etapa ):Observable<any> {

  	  let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

  	  return this.http.post(this.etapaURL, etapa, { headers } );

  	  console.log('Viene de Nuevoetapa');
  	  console.log(JSON.stringify(etapa));

  }

  ModificaEtapa( etapa:Etapa, key$:string ):Observable<any>{
      //let url:"http://localhost/apibdm/etapas/modificae.php";
  		let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });
      etapa.key = +key$;
  	  //Trae la etapa
      return this.http.post('http://localhost:80/apibdm/etapas/modificae.php', etapa,{ headers } );

  }

  GetEtapa( id:string ){
    let url = "http://localhost:80/apibdm/etapas/traeunoe.php";
    let headers = new HttpHeaders({
        'Content-type':'application/json'
      });
  }


}
