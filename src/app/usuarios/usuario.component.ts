import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuario:Usuario = {
    id:null,
    key:0,
    nombre:'',
    email:'',
    clave:'',
    permisos:""
  }

  //usuario:Object = {
  //  nombre= null,
  //  email=null,
  //  clave=null,
  //  permiso=null
  //}

  nuevo:boolean = false;
  id:string;
  permisoCrops:boolean;
  permisoEtapas:boolean;
  permisoInformes:boolean;
  permisoAnalisis:boolean;
  permisoGraficos:boolean;
  permisoUsuarios:boolean;

  sesion:boolean;
  permisos:string;
  errorCorreo:string=null;

  constructor(private usuarioService:UsuarioService,
    private usuariosService:UsuariosService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private cookieService: CookieService ) {

      this.activatedRoute.params.subscribe(parametros=>{
        this.id = parametros['id'];

      })

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

    }

    guardar() :void {

      this.usuario.permisos = this.usuario.permisos.concat((this.permisoCrops ? "1":"0"));
      this.usuario.permisos = this.usuario.permisos.concat((this.permisoEtapas ? "1":"0"));
      this.usuario.permisos = this.usuario.permisos.concat((this.permisoInformes ? "1":"0"));
      this.usuario.permisos = this.usuario.permisos.concat((this.permisoAnalisis ? "1":"0"));
      this.usuario.permisos = this.usuario.permisos.concat((this.permisoGraficos ? "1":"0"));
      this.usuario.permisos = this.usuario.permisos.concat((this.permisoUsuarios ? "1":"0"));

      var unico = true;

      this.usuariosService.getAll().subscribe(respuesta=>{

        respuesta.forEach(us => {

          if (this.usuario.email==us.email) {
            unico = false;
            this.errorCorreo = "Ya existe un usuario con el correo ingresado";
          }
        });
        
      if (unico) {
        this.errorCorreo = null;
        if (this.id == "nuevo"){
          // Crea nuevo Usuario
          this.usuarioService.NuevoUsuario( this.usuario ).subscribe( data=>{
  
            // esta linea deberia mandar a la ruta del codigo
            //this.router.navigate(['/usuario',data.name])
            if(data.resultado){
  
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
  
              window.alert("Usuario Modificado");
            } else {
              window.alert("Error al Modificar");
            }
          })
        }
      }

        
      });
      

      
    }

  }
