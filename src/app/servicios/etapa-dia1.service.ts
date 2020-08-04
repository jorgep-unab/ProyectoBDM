import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dia1 } from '../interfaces/dia1.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Dia1Service {
  dia1BaseURL:string = "http://localhost:8080/apibdm/registro_dia1";
  dia1URL:string ="http://localhost:8080/apibdm/registro_dia1/creard1.php";
  dia1ModURL:string ="http://localhost:8080/apibdm/registro_dia1/modificad1.php";
  dia1ConsURL:string="http://localhost:8080/apibdm/registro_dia1/consultad1.php"
  dia1ElimURL: string="http://localhost:8080/apibdm/registro_dia1/eliminad1.php"

  constructor( private http:HttpClient) {}


  NuevoRegistro( dia1: Dia1):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(this.dia1URL, dia1, { headers}) ;
  }


  ModificarRegistro( dia1: Dia1 ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia1ModURL, dia1,{ headers } );

    }

    getAll():Observable<any>{
      return this.http.get(this.dia1ConsURL);
    }

    Eliminar( dia1: Dia1 ):Observable<any>{
      let headers = new HttpHeaders({
        'Content-type':'application/json'
      });

      return this.http.post(this.dia1ElimURL, dia1,{ headers } );

      }



}
