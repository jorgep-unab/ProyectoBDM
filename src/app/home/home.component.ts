import { Component, OnInit } from '@angular/core';
import {LoginService} from '../servicios/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  	if(this.loginService.getUsuario() == null){
  		this.router.navigate(['/login']);
  	}
  }

}
