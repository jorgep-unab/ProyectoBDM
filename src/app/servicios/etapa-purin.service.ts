import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purin } from '../interfaces/purin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PurinService {
  //TODO:CAMBIAR LOS NOMBRES CROP QUE NO CORRESPONDEN
  cropBaseURL:string = "http://localhost:8080/apibdm/registro_purin";
  cropURL:string ="http://localhost:8080/apibdm/registro_purin/crearp.php";
  cropModURL:string ="http://localhost:8080/apibdm/registro_purin/modificarp.php";


  constructor(private http:HttpClient) { }

  NuevoRegistro( purin:Purin):Observable<any>{

    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });


    //Trae la crop
    return this.http.post('http://localhost:8080/apibdm/registro_purin/crearp.php', purin,{ headers } );

  }

  ModificarRegistro( purin:Purin):Observable<any>{

    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.put('http://localhost:8080/apibdm/registro_purin/modificarp.php', purin,{ headers } );

  }

  getAll():Observable<any>{
    return this.http.get('http://localhost:8080/apibdm/registro_purin/consultarp.php');
  }

  Eliminar(purin:Purin):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post('http://localhost:8080/apibdm/registro_purin/eliminarp.php',purin,{ headers });
  }

  // ModificaRegistro( purin:Purin, key$:string ):Observable<any>{
  //
  //     let headers = new HttpHeaders({
  //       'Content-type':'application/json'
  //     });
  //     purin.key = +key$;
  //     //Trae la crop
  //     return this.http.post('http://localhost:8080/apibdm/registro_purin/modificarp.php', reg,{ headers } );
  //
  // }

  // GetCrop( id:string ){
  //   //TODO
  //   // let url = "http://localhost:80/apibdm/registro_purin/traerp.php";
  //   // let headers = new HttpHeaders({
  //   //     'Content-type':'application/json'
  //   //   });
  // }
  //
  // getLAST():Observable<any>{
  //
  //   return this.http.get('http://localhost:8080/apibdm/registro_purin/traeultimorp.php');
  // }
}
