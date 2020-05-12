import { Component, OnInit } from '@angular/core';
import { EtapasService } from '../servicios/etapas.service';
import { NgForm } from '@angular/forms';
import { Etapa } from '../interfaces/etapa.interfaces';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {

	private etapas:any[] = [];	

  constructor( private _etapasService:EtapasService ) { }

  ngOnInit() {
  	this._etapasService.getAll().subscribe(respuesta=>{
  		this.etapas = respuesta;
  });

  }

  PreUpdateEtapa( ModEtapa:Etapa ){
    
    //this._usuariosService.UsuarioSelecto = Object.assign({}, ModUsuario);

  }

}
