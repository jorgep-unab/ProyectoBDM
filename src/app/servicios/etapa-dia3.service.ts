import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dia3 } from '../interfaces/dia3.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Dia3Service {
  dia3BaseURL:string = "http://localhost:8080/apibdm/registro_dia3";
  dia3URL:string ="http://localhost:8080/apibdm/registro_dia3/creard3.php";
  dia3ModURL:string ="http://localhost:8080/apibdm/registro_dia3/modificad3.php";
  dia3ConsURL:string="http://localhost:8080/apibdm/registro_dia3/consultad3.php"
  dia3ElimURL:string="http://localhost:8080/apibdm/registro_dia3/eliminad3.php"

  constructor(private http:HttpClient) { }

  NuevoRegistro( dia3: Dia3):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(this.dia3URL, dia3, { headers}) ;
  }


  ModificarRegistro( dia3: Dia3 ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia3ModURL, dia3,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.dia3ConsURL);
    }

  Eliminar( dia3: Dia3 ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });

    return this.http.post(this.dia3ElimURL, dia3,{ headers } );

      }


}
