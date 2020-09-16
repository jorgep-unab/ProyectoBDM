import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  correo:string;
  clave:string;
  error:string;
  sesion:boolean;
  sub:Subscription;


  constructor(private router:Router,
              private loginService:LoginService,
              private cookieService: CookieService) { }

  ngOnInit() {

    if (this.cookieService.check('Usuario')) {
      this.router.navigate(['/home']);
    }

    this.sub = this.loginService.getEmitter().subscribe((logeado) => {

      this.sesion = logeado;
      if (this.sesion) {
        this.router.navigate(['/home']);
      }

    });


  }

  ngOnDestroy() {
   if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  iniciarSesion(){

    this.loginService.loguear(this.correo,this.clave);
    if (!this.sesion) {
        this.error = "Login incorrecto";
    }
  }
}
