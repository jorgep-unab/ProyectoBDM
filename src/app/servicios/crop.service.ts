import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Crop } from '../interfaces/crop.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  cropBaseURL:string = "http://localhost:8080/apibdm/crops";
  cropURL:string ="http://localhost:8080/apibdm/crops/creac.php";
  cropModURL:string ="http://localhost:8080/apibdm/crops/modificac.php";

  constructor( private http:HttpClient ) {}



  NuevaCrop( crop:Crop ):Observable<any> {

  	  let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });

  	  return this.http.post(this.cropURL, crop, { headers } );

  	  console.log('Viene de Nuevocrop');
  	  console.log(JSON.stringify(crop));

  }

  ModificaCrop( crop:Crop, key$:string ):Observable<any>{
      //let url:"http://localhost/apibdm/crops/modificae.php";
  		let headers = new HttpHeaders({
  	  	'Content-type':'application/json'
  	  });
      crop.key = +key$;
  	  //Trae la crop
      return this.http.post('http://localhost:8080/apibdm/crops/modificae.php', crop,{ headers } );

  }


  GetCrop( id:string ){
    let url = "http://localhost:8080/apibdm/crops/traec.php";
    let headers = new HttpHeaders({
        'Content-type':'application/json'
      });
  }

  getLAST():Observable<any>{

    return this.http.get('http://localhost:8080/apibdm/crops/traeultimoc.php');
  }


}
