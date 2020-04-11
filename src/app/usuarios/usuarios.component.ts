import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	// Recepción de datos de la consulta desde query 
	private usuarios:any[] = [];	

  constructor( private _usuariosService:UsuariosService ) { 

  }

  ngOnInit() {
  }

}
