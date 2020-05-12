import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Rutas 

import { AppRoutingModule } from './app-routing.module'; 

//Servicios

import { UsuariosService } from './servicios/usuarios.service';
import { UsuarioService } from './servicios/usuario.service';
import { EtapasService } from './servicios/etapas.service';
import { EtapaService } from './servicios/etapa.service';

//Componentes 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InformesComponent } from './informes/informes.component';
import { EtapasComponent } from './etapas/etapas.component';
import { EtapaComponent } from './etapas/etapa.component';
import { ModetapaComponent } from './etapas/modetapa.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { GraficosComponent } from './graficos/graficos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CropsComponent } from './crops/crops.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ModusuarioComponent } from './usuarios/modusuario.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    InformesComponent,
    EtapasComponent,
    EtapaComponent,
    ModetapaComponent,
    AnalisisComponent,
    GraficosComponent,
    UsuariosComponent,
    CropsComponent,
    UsuarioComponent,
    ModusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuariosService,
    UsuarioService,
    EtapasService,
    EtapaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
