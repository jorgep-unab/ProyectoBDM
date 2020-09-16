import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { UsuarioService } from '../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modusuario',
  templateUrl: './modusuario.component.html',
  styleUrls: ['./modusuario.component.css']
})
export class ModusuarioComponent implements OnInit {


  UsuarioSelecto:any;
  id:string;
  permisoCrops:boolean;
  permisoEtapas:boolean;
  permisoInformes:boolean;
  permisoAnalisis:boolean;
  permisoGraficos:boolean;
  permisoUsuarios:boolean;

  sesion:boolean;
  permisos:string;

  constructor(private usuariosService:UsuariosService,
          private usuarioService:UsuarioService,
  			  private router:Router,
  			  private ruta:ActivatedRoute,
          private cookieService: CookieService) {

  }

  ngOnInit() {

    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }

    this.permisoCrops=false;
    this.permisoEtapas=false;
    this.permisoInformes=false;
    this.permisoAnalisis=false;
    this.permisoGraficos=false;
    this.permisoUsuarios=false;

    this.ruta.params.subscribe( parametros=>{
        // Trae el usuario seleccionado
        this.usuariosService.getONE(parametros.id).subscribe(respuesta=>{
          this.UsuarioSelecto = respuesta[0];
          this.UsuarioSelecto.clave = "";
          });

        });

	}

  guardarMod( FormUsuarioM : NgForm ) :void {

      // Modifica el Usuario

      this.UsuarioSelecto.permisos="";

      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoCrops ? "1":"0"));
      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoEtapas ? "1":"0"));
      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoInformes ? "1":"0"));
      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoAnalisis ? "1":"0"));
      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoGraficos ? "1":"0"));
      this.UsuarioSelecto.permisos = this.UsuarioSelecto.permisos.concat((this.permisoUsuarios ? "1":"0"));

      //this.usuarioService.ModificaUsuario( this.usuario, this.UsuarioSelecto.id ).subscribe( data=>{
      this.usuarioService.ModificaUsuario( this.UsuarioSelecto, this.UsuarioSelecto.id ).subscribe( data=>{

        if(data.resultado){
          this.UsuarioSelecto.clave = "";
          window.alert("Usuario Modificado");
        } else {
          window.alert("Error al Modificar");
        }
      })

    }
  }
