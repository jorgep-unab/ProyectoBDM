import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { UsuarioService } from '../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

	usuario:Usuario = {
		key:0,
		nombre:'',
		email:'',
		clave:'',
		permiso:''
	}	

	nuevo:boolean = false;
	id:string;

  constructor(private usuarioService:UsuarioService,
  			  private router:Router,
  			  private activatedRoute:ActivatedRoute ) { 
  			this.activatedRoute.params.subscribe(parametros=>{
  				this.id = parametros['id'];
  				console.log(parametros);
  			})

  }

  ngOnInit() {

  }

  guardar( FormUsuario : NgForm ) :void {
  	if (this.id == "nuevo"){
  		
  		// Crea nuevo Usuario
  		this.usuarioService.NuevoUsuario( this.usuario ).subscribe( data=>{
  			// esta linea deberia mandar a la ruta del codigo 
  			//this.router.navigate(['/usuario',data.name])
  			if(data.resultado){
  				console.log(this.usuario);
  				window.alert("Usuario ingresado");
  			} else {
  				window.alert("error al ingresar");
  			}
  		}, 
  		error=> console.error(error));
  		
  		
  	} else {
  		// Modifica el Usuario
  		this.usuarioService.ModificaUsuario( this.usuario, this.id ).subscribe( data=>{
  			if(data.resultado){
  				console.log(this.usuario);
  				window.alert("Usuario Modificado");
  			} else {
  				window.alert("Error al Modificar");
  			}
  		})
  		console.log("Modifica un Usuario");
  		console.log(this.usuario);
  	}
  }

}
