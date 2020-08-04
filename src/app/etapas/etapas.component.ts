import { Component, OnInit } from '@angular/core';
import { EtapasService } from '../servicios/etapas.service';
import { NgForm } from '@angular/forms';
import { Etapa } from '../interfaces/etapa.interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {

	private etapas:any[] = [];	

  constructor( private _etapasService:EtapasService,
               private router:Router,
               private ruta:ActivatedRoute
               ) { }

  ngOnInit() {
  	this._etapasService.getAll().subscribe(respuesta=>{
  		this.etapas = respuesta;
  });

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
