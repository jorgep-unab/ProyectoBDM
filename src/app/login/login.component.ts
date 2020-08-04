import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  correo:string;
  clave:string;
  error:string;
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit() {
  }
  iniciarSesion(){
  	console.log("correo" + this.correo);
  	console.log("clave" + this.clave);
  	if(this.correo == "jorge@bmauco.cl" && this.clave=="123456"){
      this.loginService.loguear(this.correo,this.clave);
  		this.router.navigate(["/home"]);
  	} else {
  		this.error = "Login incorrecto";
  	}
  }

}
