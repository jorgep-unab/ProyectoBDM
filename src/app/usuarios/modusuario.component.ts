import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { UsuarioService } from '../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-modusuario',
  templateUrl: './modusuario.component.html',
  styleUrls: ['./modusuario.component.css']
})
export class ModusuarioComponent implements OnInit {

  usuario:Usuario = {
    key:0,
    nombre:'',
    email:'',
    clave:'',
    permiso:''
  }

  public UsuarioSelecto:any;
  id:string;

  constructor(public usuariosService:UsuariosService,
          public usuarioService:UsuarioService,
  			  public router:Router,
  			  public ruta:ActivatedRoute ) {

  }

  ngOnInit() {

  this.ruta.params.subscribe( parametros=>{
      // Trae el usuario seleccionado
      this.usuariosService.getONE(parametros.id).subscribe(respuesta=>{
        this.UsuarioSelecto = respuesta[0];
        });

      });

			}

  guardarMod( FormUsuarioM : NgForm ) :void {
      // Modifica el Usuario
      console.log("ACa va le formulario", FormUsuarioM);
      this.usuario = FormUsuarioM.value;
      //this.usuarioService.ModificaUsuario( this.usuario, this.UsuarioSelecto.id ).subscribe( data=>{
      this.usuarioService.ModificaUsuario( this.UsuarioSelecto, this.UsuarioSelecto.id ).subscribe( data=>{
        console.log("Aca deberia venir el resultado del Modifica");
        if(data.resultado){
          console.log(this.UsuarioSelecto);
          window.alert("Usuario Modificado");
        } else {
          window.alert("Error al Modificar");
        }
      })
      console.log("Modifica un Usuario");
      console.log(this.UsuarioSelecto);
    }
  }
