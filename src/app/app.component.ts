import { Component,OnInit } from '@angular/core';
import {LoginService} from './servicios/login.service';
import {Usuario} from './clases/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectobdmweb';

  public getPagina(){
      return location.pathname.replace("/","");
  }

  constructor(private loginService:LoginService){

  }
  public getUsuarioLogueado():Usuario{
  	return this.loginService.getUsuario();
  }
 //public data = [
 //       {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
 //       {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
 //       {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
 //       {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
 //   ];

      //title = 'angulardatatables';
      dtOptions: DataTables.Settings = {};
      ngOnInit() {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          order:[[0, 'asc']],
          processing: true
        };
    }

}

//de Aca nuevo codigo para datatable
