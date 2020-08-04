import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dia4 } from '../interfaces/dia4.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dia4Service {
  dia4BaseURL:string = "http://localhost:8080/apibdm/registro_dia4";
  dia4URL:string ="http://localhost:8080/apibdm/registro_dia4/creard4.php";
  dia4ModURL:string ="http://localhost:8080/apibdm/registro_dia4/modificad4.php";
  dia4ConsURL:string="http://localhost:8080/apibdm/registro_dia4/consultad4.php"
  dia4ElimURL:string="http://localhost:8080/apibdm/registro_dia4/eliminad4.php"



  constructor(private http:HttpClient) { }

  NuevoRegistro( dia4: Dia4):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(this.dia4URL, dia4, { headers}) ;
  }


  ModificarRegistro( dia4: Dia4 ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia4ModURL, dia4,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.dia4ConsURL);
    }

  Eliminar( dia4: Dia4 ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });

    return this.http.post(this.dia4ElimURL, dia4,{ headers } );

      }




}
