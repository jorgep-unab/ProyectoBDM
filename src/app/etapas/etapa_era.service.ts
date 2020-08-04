import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Etapa } from '../interfaces/etapa.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

	etapaBaseURL:string = "http://localhost/apibdm/etapas";
  etapaURL:string ="http://localhost/apibdm/etapas/creae.php";
  etapaModURL:string ="http://localhost/apibdm/etapas/modificae.php";

  constructor( private http:HttpClient ) {}
  

  NuevaEtapa( etapa:Etapa ):Observable<any> {
  	  
  	  let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

  	  return this.http.post(this.etapaURL, etapa, { headers } );

  }

  ModificaEtapa( etapa:Etapa, key$:string ):Observable<any>{
      //let url:"http://localhost/apibdm/usuarios/modificau.php";
  		let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

      return this.http.put('http://localhost/apibdm/etapas/modificae.php?id='+key$, etapa,{ headers } );
  	  
  	  console.log('Viene de Edita Etapa');
  }

  GetEtapa( id:string ){
    let url = "http://localhost/apibdm/etapas/traee.php";
    let headers = new HttpHeaders({
        'Content-type':'application/json'
      });

      //return this.http.get(this.usuarioURL, usuario, { headers } );
  }
}






