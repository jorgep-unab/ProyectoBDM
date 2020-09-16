import { Component, OnInit } from '@angular/core';
import {LoginService} from '../servicios/login.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService,
              private router:Router,
              private cookieService: CookieService) { }
  logeado:boolean;
  sub:Subscription;
  usuario:string;


  ngOnInit() {
    this.getUsuario();
    this.sub = this.loginService.getEmitter().subscribe((logeado) => {

      this.logeado = logeado;
      this.getUsuario();
    });

  }

  getUsuario(){
    this.usuario = this.cookieService.get('Usuario');
  }

  ngOnDestroy() {
   if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  cerrarSession(){

  	this.loginService.cerrarSession();
  	this.router.navigate(['/login']);
    this.getUsuario();
  }

}
