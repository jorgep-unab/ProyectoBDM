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
    id:0,
    nombre:''
  }

  public EtapaSelecto:any;
  id:string;

  constructor(public etapasService:EtapasService,
          public etapaService:EtapaService,
  			  public router:Router,
  			  public ruta:ActivatedRoute ) {

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
      this.etapaService.ModificaEtapa( this.EtapaSelecto, this.EtapaSelecto.id ).subscribe( data=>{
        if(data.resultado){
          window.alert("Usuario Modificado");
        } else {
          window.alert("Error al Modificar");
        }
      })
      console.log("Modifica un Usuario");
      console.log(this.EtapaSelecto);
    }
  }
