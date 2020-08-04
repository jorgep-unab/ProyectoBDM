import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Etapa } from '../interfaces/etapa.interfaces';
import { EtapaService } from '../servicios/etapa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html'
})
export class EtapaComponent implements OnInit {

	etapa:Etapa = {
		key:0,
		nombre:''
	}	

	nuevo:boolean = false;
	id:string;

  constructor(private etapaService:EtapaService,
  			  private router:Router,
  			  private activatedRoute:ActivatedRoute ) { 
  			this.activatedRoute.params.subscribe(parametros=>{
  				this.id = parametros['id'];
  			})

  }

  ngOnInit() {

  }

  guardar( FormEtapa : NgForm ) :void {
  	if (this.id == "nuevo"){
      console.log("Aca va lo que se mando");
  		console.log(FormEtapa);
      console.log("Aca va lo del parametro");
      console.log(this.etapa);
  		// Crea nueva Etapa 
  		this.etapaService.NuevaEtapa( this.etapa ).subscribe( data=>{
  			// esta linea deberia mandar a la ruta del codigo 
  			//this.router.navigate(['/etapa',data.name])
  			if(data.resultado){
  				console.log(this.etapa);
  				window.alert("Etapa ingresada");
  			} else {
  				window.alert("error al ingresar");
  			}
  		}, 
  		error=> console.error(error));
  		
  		
  	} else {
  		// Modifica el etapa
  		this.etapaService.ModificaEtapa( this.etapa, this.id ).subscribe( data=>{
  			if(data.resultado){
  				console.log(this.etapa);
  				window.alert("Etapa Modificada");
  			} else {
  				window.alert("Error al Modificar");
  			}
  		})
  		console.log("Modifica un etapa");
  		console.log(this.etapa);
  	}
  }

}
