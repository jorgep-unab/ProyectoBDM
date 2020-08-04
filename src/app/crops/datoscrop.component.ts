import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Crop } from '../interfaces/crop.interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';

//Servicios
import { CropsService } from '../servicios/crops.service';
import { EtapasService } from '../servicios/etapas.service';
import { PurinService } from '../servicios/etapa-purin.service';
import { MojadoFardosService } from '../servicios/etapa-mojado-fardos.service';
import { EstacionadoFardosService } from '../servicios/etapa-estacionado-fardos.service';
import { PiscinaHumectacionService} from '../servicios/etapa-piscina-humectacion.service';
import { ArmadoCordonService } from '../servicios/etapa-armado-cordon.service';
import { Dia1Service } from '../servicios/etapa-dia1.service';
import { Dia2Service } from '../servicios/etapa-dia2.service';
import { Dia3Service } from '../servicios/etapa-dia3.service';
import { Dia4Service } from '../servicios/etapa-dia4.service';
import { Dia5Service } from '../servicios/etapa-dia5.service';
import { HeapService } from '../servicios/etapa-heap.service';



//Interfaces
import { Purin } from '../interfaces/purin.interfaces';
import { MojadoFardos } from '../interfaces/mojado-fardos.interfaces';
import { EstacionadoFardos } from '../interfaces/estacionado-fardos.interfaces';
import { PiscinaHumectacion } from '../interfaces/piscina-humectacion.interfaces';
import { ArmadoCordon } from '../interfaces/armado-cordon.interfaces';
import { Dia1 } from '../interfaces/dia1.interfaces';
import { Dia2 } from '../interfaces/dia2.interfaces';
import { Dia3 } from '../interfaces/dia3.interfaces';
import { Dia4 } from '../interfaces/dia4.interfaces';
import { Dia5 } from '../interfaces/dia5.interfaces';
import { Heap } from '../interfaces/heap.interfaces';




@Component({
  selector: 'app-datoscrop',
  templateUrl: './datoscrop.component.html',
  styleUrls: ['./datoscrop.component.css']
})
export class DatoscropComponent implements OnInit {

  crop:Crop = {
    key:0,
    nombre:'',
    fecha_creacion: new Date()
  }

  //NOTE:ID temporal del usuario es 1, debe ser el del usuario logeado

  // INICIO CREACION DE OBJETOS DE LAS ETAPAS
  purin:Purin={
    id:0,
    crops_id:0,
    etapas_id: 0,
    usuarios_id: 1,
    electroconductividad: 0,
    ph: 0,
    tds: 0,
    nitrogeno: 0
  }

  mojadoFardos:MojadoFardos={
    id:0,
    crops_id:0,
    etapas_id:0,
    usuarios_id:3,
    num_fardos_usados:0,
    guias_despacho_usadas:0,
    peso_neto_guias:0,
    peso_fardos_premojado:0,
    peso_fardos_postmojado:0,
    tiempo_hundido:0,
    fecha_inicio:null,
    fecha_termino:null,
    fardos_perdidos_desarme:0,
  }

  estacionadoFardos:EstacionadoFardos={
    id:0,
    crops_id:0,
    etapas_id:0,
    usuarios_id:1,
    porcentaje_sobre_pallet:0,
    temp_promedio_diai:0,
    humedad_promedio_diai:0,
    oxigeno_promedio_diai:0,
    fecha_inicio:null,
    fecha_termino: null,
    tiempo_total_estacionado: 0,
    calidad_estructura: ""
  }

  piscinaHumectacion: PiscinaHumectacion={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      litros_humect_asistida: 0,
      fecha_inicio: null,
      fecha_termino: null,
      horas_piscina_humect:0,
      num_paladas_desarmada: 0,
      peso_paja_desarmada:0
  }

  armadoCordon:ArmadoCordon={
    id:0,
    crops_id:0,
    etapas_id:0,
    usuarios_id:1,
    num_paladas_compostera:0,
    peso_promedio_paladas: 0,
    peso_total: 0,
    compostera_usada:"",
    fecha_inicio:null,
    fecha_termino:null,
    tiempo_total:null,
    altura_cordon:0,
    ancho_cordon:0,
    largo_cordon:0,
    temperatura: 0,
    humedad: 0,
    oxigeno: 0,
  }

  dia1: Dia1={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      fecha_inicio_pasada1:null,
      num_paladas_guano1:0,
      peso_prom_paladas1:0,
      peso_total_guano1:0,
      num_sulfato_amonio:0,
      num_urea:0,
      num_yeso:0,
      fecha_termino_pasada1:null,
      tiempo_total_pasada1:null,
      fecha_inicio_pasada2:null,
      num_paladas_guano2:0,
      peso_prom_paladas2:0,
      peso_total_guano2:0,
      fecha_termino_pasada2:null,
      tiempo_total_pasada2:null,
      fecha_inicio_pasada3:null,
      num_paladas_guano3:0,
      peso_prom_paladas3:0,
      peso_total_guano3:0,
      temperatura: 0,
      humedad: 0,
      oxigeno: 0,
      compostera_usada: ""
  }

  dia2: Dia2={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      fecha_inicio:null,
      fecha_termino:null,
      tiempo_total:null,
      caudal_inicial:0,
      caudal_final:0,
      litros_agua_agregados:0,
      litros_metro_lineal:0,
      bajadas:0,
      temperatura:0,
      humedad:0,
      oxigeno:0,
      compostera_usada:""
  }

  dia3: Dia3 = {
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      fecha_inicio:null,
      fecha_termino:null,
      tiempo_total:null,
      temperatura:0,
      humedad: 0,
      oxigeno: 0,
      compostera_usada: ""
  }

  dia4: Dia4= {
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      fecha_inicio:null,
      fecha_termino: null,
      tiempo_total:null,
      caudal_inicial: 0,
      caudal_final:0,
      litros_agua_agregados:0,
      litros_metro_lineal:0,
      bajadas:0,
      compostera_usada:""
  }

  dia5: Dia5= {
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      fecha_inicio:null,
      fecha_termino: null,
      tiempo_total: null,
      bunker:"",
      num_spigots:0,
      num_paladas:0,
      peso_prom_paladas: 0,
      peso_total_llenado_bunker: 0,
      peso_perdida_material: 0,
      altura_llenado:0,
      humedad: 0,
      ph: 0
  }

  heap:Heap={
    id:0,
    crops_id:0,
    etapas_id:0,
    usuarios_id:1,
    amoniaco:0,
    fecha_inicio_armado:null,
    fecha_termino_armado:null,
    altura_heap:0,
    ancho_heap:0,
    largo_heap:0,
    num_paladas: 0,
    peso_prom_paladas:0,
    peso_perdida_material:0,
  }

  reset(){
    this.purin={
      id:0,
      crops_id:0,
      etapas_id: 0,
      usuarios_id: 1,
      electroconductividad: 0,
      ph: 0,
      tds: 0,
      nitrogeno: 0
    }

    this.mojadoFardos={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:3,
      num_fardos_usados:0,
      guias_despacho_usadas:0,
      peso_neto_guias:0,
      peso_fardos_premojado:0,
      peso_fardos_postmojado:0,
      tiempo_hundido:0,
      fecha_inicio:null,
      fecha_termino:null,
      fardos_perdidos_desarme:0,
    }

    this.estacionadoFardos={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      porcentaje_sobre_pallet:0,
      temp_promedio_diai:0,
      humedad_promedio_diai:0,
      oxigeno_promedio_diai:0,
      fecha_inicio:null,
      fecha_termino: null,
      tiempo_total_estacionado: 0,
      calidad_estructura: ""
    }

    this.piscinaHumectacion={
          id:0,
          crops_id:0,
          etapas_id:0,
          usuarios_id:1,
          litros_humect_asistida: 0,
          fecha_inicio: null,
          fecha_termino: null,
          horas_piscina_humect:0,
          num_paladas_desarmada: 0,
          peso_paja_desarmada:0
      }

    this.armadoCordon={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      num_paladas_compostera:0,
      peso_promedio_paladas: 0,
      peso_total: 0,
      compostera_usada:"",
      fecha_inicio:null,
      fecha_termino:null,
      tiempo_total:null,
      altura_cordon:0,
      ancho_cordon:0,
      largo_cordon:0,
      temperatura: 0,
      humedad: 0,
      oxigeno: 0,
    }

    this.dia1={
          id:0,
          crops_id:0,
          etapas_id:0,
          usuarios_id:1,
          fecha_inicio_pasada1:null,
          num_paladas_guano1:0,
          peso_prom_paladas1:0,
          peso_total_guano1:0,
          num_sulfato_amonio:0,
          num_urea:0,
          num_yeso:0,
          fecha_termino_pasada1:null,
          tiempo_total_pasada1:null,
          fecha_inicio_pasada2:null,
          num_paladas_guano2:0,
          peso_prom_paladas2:0,
          peso_total_guano2:0,
          fecha_termino_pasada2:null,
          tiempo_total_pasada2:null,
          fecha_inicio_pasada3:null,
          num_paladas_guano3:0,
          peso_prom_paladas3:0,
          peso_total_guano3:0,
          temperatura: 0,
          humedad: 0,
          oxigeno: 0,
          compostera_usada: ""
      }

    this.dia2={
        id:0,
        crops_id:0,
        etapas_id:0,
        usuarios_id:1,
        fecha_inicio:null,
        fecha_termino:null,
        tiempo_total:null,
        caudal_inicial:0,
        caudal_final:0,
        litros_agua_agregados:0,
        litros_metro_lineal:0,
        bajadas:0,
        temperatura:0,
        humedad:0,
        oxigeno:0,
        compostera_usada:""
    }

    this.dia3 = {
        id:0,
        crops_id:0,
        etapas_id:0,
        usuarios_id:1,
        fecha_inicio:null,
        fecha_termino:null,
        tiempo_total:null,
        temperatura:0,
        humedad: 0,
        oxigeno: 0,
        compostera_usada: ""
    }

    this.dia4 = {
          id:0,
          crops_id:0,
          etapas_id:0,
          usuarios_id:1,
          fecha_inicio:null,
          fecha_termino: null,
          tiempo_total:null,
          caudal_inicial: 0,
          caudal_final:0,
          litros_agua_agregados:0,
          litros_metro_lineal:0,
          bajadas:0,
          compostera_usada:""
      }

    this.dia5 = {
          id:0,
          crops_id:0,
          etapas_id:0,
          usuarios_id:1,
          fecha_inicio:null,
          fecha_termino: null,
          tiempo_total: null,
          bunker:"",
          num_spigots:0,
          num_paladas:0,
          peso_prom_paladas: 0,
          peso_total_llenado_bunker: 0,
          peso_perdida_material: 0,
          altura_llenado:0,
          humedad: 0,
          ph: 0
      }

    this.heap={
      id:0,
      crops_id:0,
      etapas_id:0,
      usuarios_id:1,
      amoniaco:0,
      fecha_inicio_armado:null,
      fecha_termino_armado:null,
      altura_heap:0,
      ancho_heap:0,
      largo_heap:0,
      num_paladas: 0,
      peso_prom_paladas:0,
      peso_perdida_material:0,
    }

    this.idReg=null;
  }

  //Para las ids al editar y eliminar
  idReg:any;


  // FIN CREACION DE OBJETOS DE LAS ETAPAS

  //TODO: REALIZAR VALIDACION DE CADA FORMULARIO

  private CropSelecto:any = [];
  private Etapas:any =[];
  private RegistrosPurin:any[] = [];
  private RegistrosMojadoFardos:any[] = [];
  private RegistrosEstacionadoFardos:any[] = [];
  private RegistrosArmadoCordon:any[] = [];
  private RegistrosPiscinaH:any[] = [];
  private RegistrosDia1:any[] = [];
  private RegistrosDia2:any[] = [];
  private RegistrosDia3:any[] = [];
  private RegistrosDia4:any[] = [];
  private RegistrosDia5:any[] = [];
  private RegistrosHeap:any[] = [];


  id:string;
  selectEtapa:0;

  constructor(private cropsService:CropsService,
    private etapasService:EtapasService,
    private purinService:PurinService,
    private mojadoFardosService:MojadoFardosService,
    private estacionadoFardosService:EstacionadoFardosService,
    private piscinaHumectacionService:PiscinaHumectacionService,
    private armadoCordonService:ArmadoCordonService,
    private dia1Service:Dia1Service,
    private dia2Service:Dia2Service,
    private dia3Service:Dia3Service,
    private dia4Service:Dia4Service,
    private dia5Service:Dia5Service,
    private heapService:HeapService,
    private router:Router,
    private ruta:ActivatedRoute ) {

    }

    //TODO: PREGUNTAR SI SE REQUIEREN LIMITES EN LOS RANGOS DE LOS DATOS
    ngOnInit() {
      this.ruta.params.subscribe( parametros=>{
        // Trae el usuario seleccionado
        this.cropsService.getONE(parametros.id).subscribe(respuesta=>{

          this.CropSelecto = respuesta[0];

        });

      });
      // Trae las etapas existentes
      this.etapasService.getAll().subscribe(respuesta=>{

        this.Etapas = respuesta;

        //Para que la primera opcion sea el mensaje de seleccione
        this.Etapas.unshift({id:0,nombre:"Seleccione Etapa del Crop"});

        this.selectEtapa=0;
      });

    }


    asignarId(id:any, tipo:string):void{
      switch (tipo) {

        //Purin
        case "purin":

          this.idReg=this.RegistrosPurin.find(p => p.id==id);

          this.purin = this.idReg;

        break;

        //Mojado Fardos
        case "mojadoF":

          this.idReg=this.RegistrosMojadoFardos.find(m => m.id==id);

          this.mojadoFardos = this.idReg;

        break;

        //Estacionado fardos
        case "estacionF":

          this.idReg=this.RegistrosEstacionadoFardos.find(e => e.id==id);

          this.estacionadoFardos = this.idReg;

        break;

        //Piscina humectación
        case "piscinaH":

          this.idReg=this.RegistrosPiscinaH.find(p => p.id==id);

          this.piscinaHumectacion = this.idReg;

        break;

        //Armado Cordón
        case "armCor":

          this.idReg=this.RegistrosArmadoCordon.find(r => r.id==id);

          this.armadoCordon = this.idReg;
        break;

        //Etapa día 2
        case "dia1":

          this.idReg=this.RegistrosDia1.find(r => r.id==id);

          this.dia1 = this.idReg;
        break;

        //Etapa día 2
        case "dia2":

          this.idReg=this.RegistrosDia2.find(r => r.id==id);

          this.dia2 = this.idReg;
        break;

        //Etapa día 3
        case "dia3":

          this.idReg=this.RegistrosDia3.find(r => r.id==id);

          this.dia3 = this.idReg;
        break;

        //Etapa día 4
        case "dia4":

          this.idReg=this.RegistrosDia4.find(r => r.id==id);

          this.dia4 = this.idReg;
        break;

        //Etapa día 5
        case "dia5":

          this.idReg=this.RegistrosDia5.find(r => r.id==id);

          this.dia5 = this.idReg;
        break;

        case "heap":

          this.idReg=this.RegistrosHeap.find(r => r.id==id);

          this.heap = this.idReg;
        break;

        default:
        break;
      }

    }


    MostrarTabla():void{

      switch (Number(this.selectEtapa)) {

        //Purin
        case 1:

          this.purinService.getAll().subscribe(respuesta=>{

          this.RegistrosPurin = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Mojado Fardos
        case 2:
        this.mojadoFardosService.getAll().subscribe(respuesta=>{

          this.RegistrosMojadoFardos = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Estacionado fardos
        case 3:
        this.estacionadoFardosService.getAll().subscribe(respuesta=>{

          this.RegistrosEstacionadoFardos = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Piscina humectación
        case 4:
        this.piscinaHumectacionService.getAll().subscribe(respuesta=>{

          this.RegistrosPiscinaH = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);
        });
        break;

        //Armado Cordon
        case 5:
        this.armadoCordonService.getAll().subscribe(respuesta=>{

          this.RegistrosArmadoCordon = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Día 1
        case 6:
        this.dia1Service.getAll().subscribe(respuesta=>{

          this.RegistrosDia1 = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Día 2
        case 7:
        this.dia2Service.getAll().subscribe(respuesta=>{

          this.RegistrosDia2 = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Día 3
        case 8:
        this.dia3Service.getAll().subscribe(respuesta=>{

          this.RegistrosDia3 = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Día 4
        case 9:
        this.dia4Service.getAll().subscribe(respuesta=>{

          this.RegistrosDia4 = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        //Día 5
        case 10:
        this.dia5Service.getAll().subscribe(respuesta=>{

          this.RegistrosDia5 = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        case 11:
        this.heapService.getAll().subscribe(respuesta=>{
          this.RegistrosHeap = respuesta.filter(reg =>reg.crops_id==this.CropSelecto.id);

        });
        break;

        default:
        break;
      }
    }

    //MÉTODOS DE GUARDADO
    guardarPurin( FormCropM : NgForm ) :void {

      this.purin.crops_id=this.CropSelecto.id;

      this.purin.etapas_id=this.selectEtapa;

      this.purinService.NuevoRegistro(this.purin).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro ingresado exitosamente");

          this.RegistrosPurin.push(this.purin);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })

    }

    guardarMojadoFardos( FormCropM : NgForm ) :void {

      this.mojadoFardos.crops_id=this.CropSelecto.id;
      this.mojadoFardos.etapas_id=this.selectEtapa;

      console.log(this.mojadoFardos);
      this.mojadoFardosService.NuevoRegistro(this.mojadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro ingresado exitosamente");

          this.RegistrosMojadoFardos.push(this.mojadoFardos);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    guardarEstacionadoFardos( FormCropM : NgForm ) :void {

      this.estacionadoFardos.crops_id=this.CropSelecto.id;
      this.estacionadoFardos.etapas_id=this.selectEtapa;
      console.log(this.estacionadoFardos);
      this.estacionadoFardosService.NuevoRegistro(this.estacionadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro ingresado exitosamente");

          this.RegistrosEstacionadoFardos.push(this.estacionadoFardos);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    guardarPiscinaH( FormCropM : NgForm ) :void {

            this.piscinaHumectacion.crops_id=this.CropSelecto.id;

            this.piscinaHumectacion.etapas_id=this.selectEtapa;

            this.piscinaHumectacionService.NuevoRegistro(this.piscinaHumectacion).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");

                this.RegistrosPiscinaH.push(this.piscinaHumectacion);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }

    guardarArmadoCordon( FormCropM : NgForm ) :void {

      this.armadoCordon.crops_id=this.CropSelecto.id;

      this.armadoCordon.etapas_id=this.selectEtapa;

      this.armadoCordonService.NuevoRegistro(this.armadoCordon).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro ingresado exitosamente");

          this.RegistrosArmadoCordon.push(this.armadoCordon);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    guardarDia1( FormCropM : NgForm ) :void {

            this.dia1.crops_id=this.CropSelecto.id;

            this.dia1.etapas_id=this.selectEtapa;

            this.dia1Service.NuevoRegistro(this.dia1).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");

                this.RegistrosDia1.push(this.dia1);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }

    guardarDia2( FormCropM : NgForm ) :void {

            this.dia2.crops_id=this.CropSelecto.id;

            this.dia2.etapas_id=this.selectEtapa;

            this.dia2Service.NuevoRegistro(this.dia2).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");

                this.RegistrosDia2.push(this.dia2);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }

    guardarDia3( FormCropM : NgForm ) :void {

            this.dia3.crops_id=this.CropSelecto.id;

            this.dia3.etapas_id=this.selectEtapa;
            console.log(this.dia3);

            this.dia3Service.NuevoRegistro(this.dia3).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");

                this.RegistrosDia3.push(this.dia3);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }

    guardarDia4( FormCropM : NgForm ) :void {

            this.dia4.crops_id=this.CropSelecto.id;

            this.dia4.etapas_id=this.selectEtapa;
            console.log(this.dia4);

            this.dia4Service.NuevoRegistro(this.dia4).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");

                this.RegistrosDia4.push(this.dia4);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }

    guardarDia5( FormCropM : NgForm ) :void {

            this.dia5.crops_id=this.CropSelecto.id;

            this.dia5.etapas_id=this.selectEtapa;

            this.dia5Service.NuevoRegistro(this.dia5).subscribe( data=>{
              if(data.resultado){

                window.alert("Registro ingresado exitosamente");
                this.RegistrosDia5.push(this.dia5);
                this.reset();
                this.MostrarTabla();
              } else {
                window.alert("Error al ingresar el registro");
              }
            })
            this.reset();
          }



    guardarHeap( FormCropM : NgForm ) :void {

         this.heap.crops_id=this.CropSelecto.id;

         this.heap.etapas_id=this.selectEtapa;
         console.log(this.heap);

         this.heapService.NuevoHeap(this.heap).subscribe( data=>{
           if(data.resultado){

             window.alert("Registro ingresado exitosamente");

             this.RegistrosHeap.push(this.heap);
             this.reset();
             this.MostrarTabla();
           } else {
             window.alert("Error al ingresar el registro");
           }
         })
       }


    //MÉTODOS DE ACTUALIZACION
    actualizarPurin( FormCropM : NgForm ) :void {

      this.purin.crops_id=this.CropSelecto.id;
      this.purin.etapas_id=this.selectEtapa;

      console.log(this.purin);
      this.purinService.ModificarRegistro(this.purin).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro actualizado exitosamente");
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
      this.reset();
    }

    actualizarMojadoFardos( FormCropM : NgForm ) :void {

      this.mojadoFardos.crops_id=this.CropSelecto.id;
      this.mojadoFardos.etapas_id=this.selectEtapa;
      console.log(this.mojadoFardos);
      this.mojadoFardosService.ModificarRegistro(this.mojadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro actualizado exitosamente");
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
      this.reset();
    }

    actualizarEstacionadoFardos( FormCropM : NgForm ) :void {

      this.estacionadoFardos.crops_id=this.CropSelecto.id;
      this.estacionadoFardos.etapas_id=this.selectEtapa;
      console.log(this.estacionadoFardos);
      this.estacionadoFardosService.ModificarRegistro(this.estacionadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro actualizado exitosamente");
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
      this.reset();
    }

    actualizarPiscinaH( FormCropM : NgForm ) :void {

     this.piscinaHumectacion.crops_id=this.CropSelecto.id;
     this.piscinaHumectacion.etapas_id=this.selectEtapa;

     this.piscinaHumectacionService.ModificarRegistro(this.piscinaHumectacion).subscribe( data=>{
       if(data.resultado){
         window.alert("Registro actualizado exitosamente");
       } else {
         window.alert("Error al ingresar el registro");
       }
     })
     this.reset();
   }

    actualizarArmadoCordon( FormCropM : NgForm ) :void {

      this.armadoCordon.crops_id=this.CropSelecto.id;
      this.armadoCordon.etapas_id=this.selectEtapa;

      this.armadoCordonService.ModificarRegistro(this.armadoCordon).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro actualizado exitosamente");
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
      this.reset();
    }

    actualizarDia1( FormCropM : NgForm ) :void {

     console.log(this.dia1);
     this.dia1Service.ModificarRegistro(this.dia1).subscribe( data=>{
       if(data.resultado){
         window.alert("Registro actualizado exitosamente");
       } else {
         window.alert("Error al ingresar el registro");
       }
     })
     this.reset();
   }

    actualizarDia2( FormCropM : NgForm ) :void {

       this.dia2Service.ModificarRegistro(this.dia2).subscribe( data=>{
         if(data.resultado){
           window.alert("Registro actualizado exitosamente");
         } else {
           window.alert("Error al ingresar el registro");
         }
       })
       this.reset();
     }

    actualizarDia3( FormCropM : NgForm ) :void {

     console.log(this.dia3);
     this.dia3Service.ModificarRegistro(this.dia3).subscribe( data=>{
       if(data.resultado){
         window.alert("Registro actualizado exitosamente");
       } else {
         window.alert("Error al ingresar el registro");
       }
     })
     this.reset();

   }

    actualizarDia4( FormCropM : NgForm ) :void {


     this.dia4Service.ModificarRegistro(this.dia4).subscribe( data=>{
       if(data.resultado){
         window.alert("Registro actualizado exitosamente");
       } else {
         window.alert("Error al ingresar el registro");
       }
     })
     this.reset();
   }

    actualizarDia5( FormCropM : NgForm ) :void {


       this.dia5Service.ModificarRegistro(this.dia5).subscribe( data=>{
         if(data.resultado){
           window.alert("Registro actualizado exitosamente");
         } else {
           window.alert("Error al ingresar el registro");
         }
       })
       this.reset();
     }

    actualizarHeap( FormCropM : NgForm ) :void {

       console.log(this.heap);
       this.heapService.ModificarRegistro(this.heap).subscribe( data=>{
         if(data.resultado){
           window.alert("Registro actualizado exitosamente");
         } else {
           window.alert("Error al ingresar el registro");
         }
       })
       this.reset();
     }


    //MÉTODOS DE ELIMINACIÓN
    eliminarPurin(id:number) :void {

      this.purin=this.RegistrosPurin.find(p => p.id==id);

      this.purin.crops_id=this.CropSelecto.id;
      this.purin.etapas_id=this.selectEtapa;


      this.purinService.Eliminar(this.purin).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro eliminado exitosamente");

          this.RegistrosPurin = this.RegistrosPurin.filter(p => p != this.purin);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    eliminarMojadoFardos(id:number) :void {

      this.mojadoFardos=this.RegistrosMojadoFardos.find(m => m.id==id);

      this.mojadoFardos.crops_id=this.CropSelecto.id;
      this.mojadoFardos.etapas_id=this.selectEtapa;

      //TODO: CREAR E IMPLEMENTAR EL SERVICIO
      this.mojadoFardosService.Eliminar(this.mojadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro eliminado exitosamente");

          this.RegistrosMojadoFardos = this.RegistrosMojadoFardos.filter(m => m != this.mojadoFardos);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    eliminarEstacionadoFardos(id:number) :void {

      this.estacionadoFardos=this.RegistrosEstacionadoFardos.find(e => e.id==id);

      this.estacionadoFardos.crops_id=this.CropSelecto.id;
      this.estacionadoFardos.etapas_id=this.selectEtapa;
      console.log(this.estacionadoFardos);
      this.estacionadoFardosService.Eliminar(this.estacionadoFardos).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro eliminado exitosamente");

          this.RegistrosEstacionadoFardos = this.RegistrosEstacionadoFardos.filter(e => e != this.estacionadoFardos);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    eliminarPiscinaH(id:number) :void {

          this.piscinaHumectacion=this.RegistrosPiscinaH.find(p=> p.id==id);

          this.piscinaHumectacion.crops_id=this.CropSelecto.id;
          this.piscinaHumectacion.etapas_id=this.selectEtapa;

          this.piscinaHumectacionService.Eliminar(this.piscinaHumectacion).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");

              this.RegistrosPiscinaH = this.RegistrosPiscinaH.filter(e => e != this.piscinaHumectacion);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })
        }

    eliminarArmadoCordon(id:number) :void {

      this.armadoCordon=this.RegistrosArmadoCordon.find(a => a.id==id);
      console.log(this.RegistrosArmadoCordon);

      this.armadoCordon.crops_id=this.CropSelecto.id;
      this.armadoCordon.etapas_id=this.selectEtapa;

      //TODO: CREAR E IMPLEMENTAR EL SERVICIO
      this.armadoCordonService.Eliminar(this.armadoCordon).subscribe( data=>{
        if(data.resultado){
          window.alert("Registro eliminado exitosamente");

          this.RegistrosArmadoCordon= this.RegistrosArmadoCordon.filter(a => a != this.armadoCordon);
          this.reset();
          this.MostrarTabla();
        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

    eliminarDia1(id:number) :void {

          this.dia1=this.RegistrosDia1.find(d=> d.id==id);

          this.dia1.crops_id=this.CropSelecto.id;
          this.dia1.etapas_id=this.selectEtapa;

          this.dia1Service.Eliminar(this.dia1).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");
              this.RegistrosDia1= this.RegistrosDia1.filter(a => a != this.dia1);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })
          this.reset();

        }

    eliminarDia2(id:number) :void {

          this.dia2=this.RegistrosDia2.find(d=> d.id==id);

          this.dia2.crops_id=this.CropSelecto.id;
          this.dia2.etapas_id=this.selectEtapa;

          this.dia2Service.Eliminar(this.dia2).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");
              this.RegistrosDia2= this.RegistrosDia2.filter(a => a != this.dia2);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })
        }

    eliminarDia3(id:number) :void {

          this.dia3=this.RegistrosDia3.find(d=> d.id==id);

          this.dia3.crops_id=this.CropSelecto.id;
          this.dia3.etapas_id=this.selectEtapa;

          this.dia3Service.Eliminar(this.dia3).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");
              this.RegistrosDia3= this.RegistrosDia3.filter(a => a != this.dia3);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })

        }

    eliminarDia4(id:number) :void {

          this.dia4=this.RegistrosDia4.find(d=> d.id==id);

          this.dia4.crops_id=this.CropSelecto.id;
          this.dia4.etapas_id=this.selectEtapa;

          this.dia4Service.Eliminar(this.dia4).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");

              this.RegistrosDia4 = this.RegistrosDia4.filter(d => d != this.dia4);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })
        }

    eliminarDia5(id:number) :void {

          this.dia5=this.RegistrosDia5.find(d=> d.id==id);

          this.dia5.crops_id=this.CropSelecto.id;
          this.dia5.etapas_id=this.selectEtapa;

          this.dia5Service.Eliminar(this.dia5).subscribe( data=>{
          if(data.resultado){
              window.alert("Registro eliminado exitosamente");
              this.RegistrosDia5 = this.RegistrosDia5.filter(d => d != this.dia5);
              this.reset();
              this.MostrarTabla();
            } else {
              window.alert("Error al ingresar el registro");
            }
          })
        }

    eliminarHeap(id:number) :void {

      this.heap=this.RegistrosHeap.find(h=> h.id==id);

      this.heap.crops_id=this.CropSelecto.id;
      this.heap.etapas_id=this.selectEtapa;

      this.heapService.EliminarHeap(this.heap).subscribe( data=>{
      if(data.resultado){
          window.alert("Registro eliminado exitosamente");
          this.RegistrosHeap = this.RegistrosHeap.filter(h => h != this.heap);
          this.reset();
          this.MostrarTabla();

        } else {
          window.alert("Error al ingresar el registro");
        }
      })
    }

  }
