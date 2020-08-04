import { Component, OnInit } from '@angular/core';
import {LoginService} from '../servicios/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  cerrarSession(){
  	this.loginService.cerrarSession();
  	this.router.navigate(['/login']);
  }

}
