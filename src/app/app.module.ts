import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Rutas 

import { AppRoutingModule } from './app-routing.module'; 

//Servicios

import { UsuariosService } from './servicios/usuarios.service';

//Componentes 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InformesComponent } from './informes/informes.component';
import { EtapasComponent } from './etapas/etapas.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { GraficosComponent } from './graficos/graficos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CropsComponent } from './crops/crops.component';
import { UsuarioComponent } from './usuarios/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    InformesComponent,
    EtapasComponent,
    AnalisisComponent,
    GraficosComponent,
    UsuariosComponent,
    CropsComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
