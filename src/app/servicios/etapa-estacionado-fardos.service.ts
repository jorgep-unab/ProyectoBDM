import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstacionadoFardos } from '../interfaces/estacionado-fardos.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstacionadoFardosService {
  estacionadoFBaseURL:string = "http://localhost:8080/apibdm/registro_estacionado_fardos";
  estacionadoFURL:string ="http://localhost:8080/apibdm/registro_estacionado_fardos/crearef.php";
  estacionadoFModURL:string ="http://localhost:8080/apibdm/registro_estacionado_fardos/modificaef.php";
  estacionadoFConsURL:string="http://localhost:8080/apibdm/registro_estacionado_fardos/consultaef.php"
  estacionadoFElimURL:string="http://localhost:8080/apibdm/registro_estacionado_fardos/eliminaef.php"


  constructor(private http:HttpClient) { }

  NuevoRegistro( estacionadoF: EstacionadoFardos):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.estacionadoFURL, estacionadoF, { headers}) ;
  }


  ModificarRegistro( estacionadoF:EstacionadoFardos ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.estacionadoFModURL, estacionadoF,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.estacionadoFConsURL);
    }

  Eliminar( estacionadoF:EstacionadoFardos ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });

    return this.http.post(this.estacionadoFElimURL, estacionadoF,{ headers } );

      }




}
