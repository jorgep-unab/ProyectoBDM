import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PiscinaHumectacion} from '../interfaces/piscina-humectacion.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiscinaHumectacionService {

  piscinaHumecBaseURL:string = "http://localhost:8080/apibdm/registro_piscina_humectacion";
  piscinaHumecURL:string ="http://localhost:8080/apibdm/registro_piscina_humectacion/crearph.php";
  piscinaHumecModURL:string ="http://localhost:8080/apibdm/registro_piscina_humectacion/modificaph.php";
  piscinaHumecConsURL:string="http://localhost:8080/apibdm/registro_piscina_humectacion/consultaph.php"
  piscinaHumecElimURL:string="http://localhost:8080/apibdm/registro_piscina_humectacion/eliminaph.php"


  constructor(private http:HttpClient) { }

    NuevoRegistro(piscinaHumectacion : PiscinaHumectacion):Observable<any>{
      let headers = new HttpHeaders({
        'Content-type':'application/json'
      });




      return this.http.post(this.piscinaHumecURL, piscinaHumectacion, { headers}) ;
    }


    ModificarRegistro( piscinaHumectacion:PiscinaHumectacion):Observable<any>{
      let headers = new HttpHeaders({
        'Content-type':'application/json'
      });
      console.log(piscinaHumectacion);
      return this.http.put(this.piscinaHumecModURL, piscinaHumectacion,{ headers } );

      }

    getAll():Observable<any>{
        return this.http.get(this.piscinaHumecConsURL);
      }

    Eliminar( piscinaHumectacion:PiscinaHumectacion):Observable<any>{
      let headers = new HttpHeaders({
          'Content-type':'application/json'
       });

      return this.http.post(this.piscinaHumecElimURL, piscinaHumectacion,{ headers } );

      }



}
