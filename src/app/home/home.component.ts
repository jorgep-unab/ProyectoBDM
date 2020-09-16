import { Component, OnInit } from '@angular/core';
import {LoginService} from '../servicios/login.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService,
              private router:Router,
              private cookieService: CookieService) { }

  sesion:boolean;

  ngOnInit() {

      this.sesion = this.cookieService.check('Usuario');

      if (!this.sesion) {
        this.router.navigate(['/login']);
      }

  }

}
