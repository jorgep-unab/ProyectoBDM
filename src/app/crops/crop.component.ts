import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Crop } from '../interfaces/crop.interfaces';
import { CropService } from '../servicios/crop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html'
})
export class CropComponent implements OnInit {


	crop:Crop = {
		key:0,
		nombre:'',
    fecha_creacion: null
	}


	nuevo:boolean = false;
	id:string;
  sesion:boolean;
  permisos:string;

  constructor(private cropService:CropService,
  			  private router:Router,
  			  private activatedRoute:ActivatedRoute,
          private cookieService: CookieService) {

  			this.activatedRoute.params.subscribe(parametros=>{
  				this.id = parametros['id'];

  			})

  }

  ngOnInit() {

    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }

    //Trae el ultimo crop ingresado
      this.cropService.getLAST().subscribe(respuesta=>{

      this.crop = respuesta[0];
    //2020-050
    //TODO: PREGUNTAR SI DEJAR EL NOMBRE SIN OPCION DE MODIFICAR
      let arrNombre = this.crop.nombre.split('-');
      this.crop.nombre = arrNombre[0] + '-'+ (+arrNombre[1]+1);
      this.crop.fecha_creacion = null;

      });

      //});

  }

  guardar( FormCrop : NgForm ) :void {
  	if (this.id == "nuevo"){
  		// Crea nueva Crop

      //NOTE: Para validar el formato de los nombres mediante regex,
      //cambiar de ser necesario
      let regex = new RegExp("[0-9]{4}-[0-9]{3}$");
      if (regex.test(this.crop.nombre)) {
        this.cropService.NuevaCrop( this.crop).subscribe( data=>{
          if(data.resultado){
            window.alert("Crop ingresado");
          } else {
            window.alert("Error al ingresar");
          }
        },
        error=> console.error(error));
      }



    //TODO: PREGUNTAR SI ESTE MODIFICAR ES UTIL O NO EN ESTE LUGAR
  	} else {
  		// Modifica el crop
  		this.cropService.ModificaCrop( this.crop, this.id ).subscribe( data=>{
  			if(data.resultado){
  				console.log(this.crop);
  				window.alert("Crop Modificada");
  			} else {
  				window.alert("Error al Modificar");
  			}
  		})
  		console.log("Modifica un crop");
  		console.log(this.crop);
  	}
  }

}
