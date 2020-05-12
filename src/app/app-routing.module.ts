import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InformesComponent } from './informes/informes.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { CropsComponent } from './crops/crops.component';
import { EtapasComponent } from './etapas/etapas.component';
import { EtapaComponent } from './etapas/etapa.component';
import { ModetapaComponent } from './etapas/modetapa.component';
import { GraficosComponent } from './graficos/graficos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ModusuarioComponent } from './usuarios/modusuario.component';


const routes: Routes = [
	{path:'login', component: LoginComponent},
	{path:'home', component: HomeComponent},
	{path:'crops', component: CropsComponent},
	{path:'etapas', component: EtapasComponent},
	{path:'etapa/:id',component: EtapaComponent},
	{path:'modetapa/:id',component: ModetapaComponent},
	{path:'informes', component: InformesComponent},
	{path:'analisis', component: AnalisisComponent},
	{path:'graficos', component: GraficosComponent},
	{path:'usuarios', component: UsuariosComponent},
	{path:'usuario/:id',component: UsuarioComponent},
	{path:'modusuario/:id',component: ModusuarioComponent},

	{path:'', redirectTo:'/login', pathMatch:'full'}
	];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule,FormsModule]
})

export class AppRoutingModule { }
