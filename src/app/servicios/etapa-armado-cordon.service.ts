import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArmadoCordon } from '../interfaces/armado-cordon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArmadoCordonService {
  cropBaseURL:string = "http://localhost:8080/apibdm/registro_armado-cordon";
  cropURL:string ="http://localhost:8080/apibdm/registro_armado_cordon/crearac.php";
  URLMod:string ="http://localhost:8080/apibdm/registro_armado_cordon/modificaac.php";


  constructor(private http:HttpClient) { }

  NuevoRegistro( armadoCordon:ArmadoCordon):Observable<any> {

      let headers = new HttpHeaders({
        'Content-type':'application/json'
      });

      return this.http.post(this.cropURL, armadoCordon, { headers } );

  }

  getAll():Observable<any>{
    return this.http.get('http://localhost:8080/apibdm/registro_armado_cordon/consultaac.php');
  }


  ModificarRegistro( armadoCordon:ArmadoCordon):Observable<any>{

    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.put("http://localhost:8080/apibdm/registro_armado_cordon/modificaac.php", armadoCordon, { headers } );
  }

  Eliminar(armadoCordon:ArmadoCordon):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post('http://localhost:8080/apibdm/registro_armado_cordon/eliminaac.php',armadoCordon,{ headers });
  }

}
