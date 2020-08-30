import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


	// Recepción de datos de la consulta desde query
	private usuarios:any[] = [];

  constructor( private _usuariosService:UsuariosService,
               private router:Router,
               private ruta:ActivatedRoute
             ) {

  }

  ngOnInit() {
  	this._usuariosService.getAll().subscribe(respuesta=>{
  		this.usuarios = respuesta;
  	});
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
