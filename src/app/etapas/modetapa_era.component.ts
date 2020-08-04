import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Etapa } from '../interfaces/etapa.interfaces';
import { EtapaService } from '../servicios/etapa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EtapasService } from '../servicios/etapas.service';

@Component({
  selector: 'app-modetapa',
  templateUrl: './modetapa.component.html',
  styleUrls: ['./modetapa.component.css']
})
export class ModetapaComponent implements OnInit {

  etapa:Etapa = {
    key:0,
    nombre:''
  }
	
  private EtapaSelecto:any;
  id:string;

  constructor(private etapasService:EtapasService,
          private etapaService:EtapaService,
  			  private router:Router,
  			  private ruta:ActivatedRoute ) { 
  	
  }

  ngOnInit() {
  
  this.ruta.params.subscribe( parametros=>{
      // Trae el usuario seleccionado
      this.etapasService.getONE(parametros.id).subscribe(respuesta=>{
        this.EtapaSelecto = respuesta[0];
        });
        
      });
    
			}

  guardarMod( FormEtapaM : NgForm ) :void {
      // Modifica el Usuario
      this.etapa = FormEtapaM.value;
      //this.usuarioService.ModificaUsuario( this.usuario, this.UsuarioSelecto.id ).subscribe( data=>{
      this.etapaService.ModificaEtapa( this.EtapaSelecto, this.EtapaSelecto.id ).subscribe( data=>{
        console.log("Aca deberia venir el resultado del Modifica");
        if(data.resultado){
          console.log(this.EtapaSelecto);
          window.alert("Etapa Modificada");
        } else {
          window.alert("Error al Modificar Etapa");
        }
      })
      console.log("Modifica una Etapa");
      console.log(this.EtapaSelecto);
    }
  }

