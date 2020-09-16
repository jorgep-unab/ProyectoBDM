import { Component, OnInit } from '@angular/core';
import { EtapasService } from '../servicios/etapas.service';
import { NgForm } from '@angular/forms';
import { Etapa } from '../interfaces/etapa.interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {

	etapas:any[] = [];
  sesion:boolean;
  permisos:string;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  maxSize=10;

  constructor( private _etapasService:EtapasService,
               private router:Router,
               private cookieService: CookieService,
               private ruta:ActivatedRoute
               ) { }

  ngOnInit() {

    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }

  	this._etapasService.getAll().subscribe(respuesta=>{
  		this.etapas = respuesta;
      this.collectionSize = this.etapas.length;
  });

  }

  get etapasGet(): any[] {
     return this.etapas
       .map((etapa, i) => ({id: i + 1, ...etapa}))
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
   }

  PreUpdateEtapa( ModEtapa:Etapa ){

    //this._usuariosService.UsuarioSelecto = Object.assign({}, ModUsuario);

  }

   EliminaEtapa( etapa:Etapa ){
    this._etapasService.BorraEtapa( etapa ).subscribe(res=>{
        this._etapasService.getAll().subscribe(respuesta=>{
        this.etapas = respuesta;});
        //this.router.navigate(['/usuarios']);

    });

  }
}
