import { Component, OnInit } from '@angular/core';
import { CropsService } from '../servicios/crops.service';
import { NgForm } from '@angular/forms';
import { Crop } from '../interfaces/crop.interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

	crops:any[] = [];
  sesion:boolean;
  permisos:string;

	page = 1;
  pageSize = 10;
  collectionSize = 0;
  maxSize=10;

  constructor( private _cropsService:CropsService,
               private router:Router,
               private ruta:ActivatedRoute,
               private cookieService: CookieService
               ) { }

  ngOnInit() {

    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }



  	this._cropsService.getAll().subscribe(respuesta=>{
  		this.crops = respuesta;
  		this.collectionSize = this.crops.length;

  });


  }
 get cropsGet(): any[] {
    return this.crops
      .map((crop, i) => ({id: i + 1, ...crop}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  PreUpdateCrop( ModCrop:Crop ){

  }


}
