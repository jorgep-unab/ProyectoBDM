import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MojadoFardos } from '../interfaces/mojado-fardos.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MojadoFardosService {
  mojadoFBaseURL:string = "http://localhost:8080/apibdm/registro_mojado_fardos";
  mojadoFURL:string ="http://localhost:8080/apibdm/registro_mojado_fardos/crearmf.php";
  mojadoFModURL:string ="http://localhost:8080/apibdm/registro_mojado_fardos/modificamf.php";
  mojadoFConsURL:string="http://localhost:8080/apibdm/registro_mojado_fardos/consultamf.php"
  mojadoFELimURL:string="http://localhost:8080/apibdm/registro_mojado_fardos/eliminamf.php"


  constructor(private http:HttpClient) { }

  NuevoRegistro( mojadoFardos: MojadoFardos):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    
    return this.http.post(this.mojadoFURL, mojadoFardos, { headers}) ;
  }


  ModificarRegistro( mojadoFardos:MojadoFardos):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.put(this.mojadoFModURL, mojadoFardos,{ headers } );

  }

  getAll():Observable<any>{
      return this.http.get(this.mojadoFConsURL);
    }

  Eliminar( mojadoFardos:MojadoFardos):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });
      //Trae la crop
    return this.http.post(this.mojadoFELimURL, mojadoFardos,{ headers } );

    }


}
