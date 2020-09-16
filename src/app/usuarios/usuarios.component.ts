import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


	// Recepción de datos de la consulta desde query
	usuarios:any[] = [];
  sesion:boolean;
  permisos:string;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  maxSize=10;

  constructor( private _usuariosService:UsuariosService,
               private router:Router,
               private ruta:ActivatedRoute,
               private cookieService: CookieService
             ) {

  }

  ngOnInit() {
    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }

  	this._usuariosService.getAll().subscribe(respuesta=>{
  		this.usuarios = respuesta;
      this.collectionSize = this.usuarios.length;
  	});
  }

  get usuariosGet(): any[] {
     return this.usuarios
       .map((usuario, i) => ({id: i + 1, ...usuario}))
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
   }

  PreUpdateusuario( ModUsuario:Usuario ){

    //this._usuariosService.UsuarioSelecto = Object.assign({}, ModUsuario);

  }

  EliminaUsuario( usuario:Usuario ){
    this._usuariosService.BorraUsuario( usuario ).subscribe(res=>{
        window.alert("Usuario Eliminado");
        this._usuariosService.getAll().subscribe(respuesta=>{
        this.usuarios = respuesta;});
        //this.router.navigate(['/usuarios']);

    });
  }

}
