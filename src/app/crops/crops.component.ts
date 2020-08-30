import { Component, OnInit } from '@angular/core';
import { CropsService } from '../servicios/crops.service';
import { NgForm } from '@angular/forms';
import { Crop } from '../interfaces/crop.interfaces';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

	private crops:any[] = [];


	page = 1;
  pageSize = 10;
  collectionSize = 0;
  maxSize=10;
  constructor( private _cropsService:CropsService,
               private router:Router,
               private ruta:ActivatedRoute
               ) { }

  ngOnInit() {
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

    //this._usuariosService.UsuarioSelecto = Object.assign({}, ModUsuario);

  }

//   EliminaCrop( crop:Crop ){
//    this._etapasService.BorraEtapa( etapa ).subscribe(res=>{
//        this._etapasService.getAll().subscribe(respuesta=>{
//        this.etapas = respuesta;});
//        //this.router.navigate(['/usuarios']);
//
//    });
//
//  }
}
