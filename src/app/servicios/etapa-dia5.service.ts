import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dia5 } from '../interfaces/dia5.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dia5Service {
  dia5BaseURL:string = "http://localhost:8080/apibdm/registro_dia5";
  dia5URL:string ="http://localhost:8080/apibdm/registro_dia5/creard5.php";
  dia5ModURL:string ="http://localhost:8080/apibdm/registro_dia5/modificad5.php";
  dia5ConsURL:string="http://localhost:8080/apibdm/registro_dia5/consultad5.php"
  dia5ElimURL:string="http://localhost:8080/apibdm/registro_dia5/eliminad5.php"


  constructor(private http:HttpClient) { }


  NuevoRegistro( dia5: Dia5):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(this.dia5URL, dia5, { headers}) ;
  }


  ModificarRegistro( dia5: Dia5 ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia5ModURL, dia5,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.dia5ConsURL);
    }

  Eliminar( dia5: Dia5 ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });

    return this.http.post(this.dia5ElimURL, dia5,{ headers } );

      }



}
