import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dia2 } from '../interfaces/dia2.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Dia2Service {
  dia2BaseURL:string = "http://localhost:8080/apibdm/registro_dia2";
  dia2URL:string ="http://localhost:8080/apibdm/registro_dia2/creard2.php";
  dia2ModURL:string ="http://localhost:8080/apibdm/registro_dia2/modificad2.php";
  dia2ConsURL:string="http://localhost:8080/apibdm/registro_dia2/consultad2.php"
  dia2ElimURL:string="http://localhost:8080/apibdm/registro_dia2/eliminad2.php"

  constructor(private http:HttpClient) { }

  NuevoRegistro( dia2: Dia2):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia2URL, dia2, { headers}) ;
  }


  ModificarRegistro( dia2: Dia2 ):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.dia2ModURL, dia2,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.dia2ConsURL);
    }

  Eliminar( dia2: Dia2 ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });
      //Trae la crop
    return this.http.post(this.dia2ElimURL, dia2,{ headers } );

      }




}
