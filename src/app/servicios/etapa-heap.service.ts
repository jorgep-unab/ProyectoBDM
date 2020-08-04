import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heap } from '../interfaces/heap.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeapService {
  heapBaseURL:string = "http://localhost:8080/apibdm/registro_heap";
  heapURL:string ="http://localhost:8080/apibdm/registro_heap/crearhp.php";
  heapModURL:string ="http://localhost:8080/apibdm/registro_heap/modificahp.php";
  heapConsURL:string="http://localhost:8080/apibdm/registro_heap/consultahp.php"
  heapElimURL:string="http://localhost:8080/apibdm/registro_heap/eliminahp.php"


  constructor(private http:HttpClient) { }

  NuevoHeap( heap: Heap):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(this.heapURL, heap, { headers}) ;
  }


  ModificarRegistro( heap:Heap):Observable<any>{
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    return this.http.post(this.heapModURL, heap,{ headers } );

    }

  getAll():Observable<any>{
      return this.http.get(this.heapConsURL);
    }

  EliminarHeap( heap:Heap ):Observable<any>{
    let headers = new HttpHeaders({
        'Content-type':'application/json'
     });

    return this.http.post(this.heapElimURL, heap,{ headers } );

      }




}
