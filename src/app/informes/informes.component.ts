import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


//Interfaces
import { Crop } from '../interfaces/crop.interfaces';
import { Etapa } from '../interfaces/etapa.interfaces';

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
import { ExportService } from '../servicios/export.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {


  //OBJETOS
  crop:Crop = {
    key:0,
    nombre:'',
    fecha_creacion: null
  }
  etapa:Etapa ={
    id:0,
    nombre:""
  }




  public Crops:any =[];
  public Etapas:any =[];

  public CropsSeleccionados:any =[];
  public EtapasSeleccionadas:any =[];
  public RegPurin:any =[];
  public RegMojadoFardos:any =[];
  public RegEstacionadoFardos:any =[];
  public RegPiscinaHumectacion:any =[];
  public RegArmadoCordon:any =[];
  public RegDia1:any =[];
  public RegDia2:any =[];
  public RegDia3:any =[];
  public RegDia4:any =[];
  public RegDia5:any =[];
  public RegHeap:any =[];

  //Listas para las tablas
  public regP:any =[];
  public regMF:any =[];
  public regEF:any =[];
  public regPH:any =[];
  public regAC:any =[];
  public regD1:any =[];
  public regD2:any =[];
  public regD3:any =[];
  public regD4:any =[];
  public regD5:any =[];
  public regH:any =[];
  public Registros=[];

  selectEtapa:0;
  selectEtapaTabla:"";
  selectCrop:0;
  selectSelEtapa:0;
  selectSelCrop:0;

  idReg:any;
  public limiteRegistro:boolean;
  public mostrarTabla:boolean = false;


  constructor(public cropsService:CropsService,
    public etapasService:EtapasService,
    public purinService:PurinService,
    public mojadoFardosService:MojadoFardosService,
    public estacionadoFardosService:EstacionadoFardosService,
    public piscinaHumectacionService:PiscinaHumectacionService,
    public armadoCordonService:ArmadoCordonService,
    public dia1Service:Dia1Service,
    public dia2Service:Dia2Service,
    public dia3Service:Dia3Service,
    public dia4Service:Dia4Service,
    public dia5Service:Dia5Service,
    public heapService:HeapService,
    public exportService:ExportService) { }

    ngOnInit() {

      this.etapasService.getAll().subscribe(respuesta=>{

        this.Etapas = respuesta;

        this.selectEtapa=0;
      });

      this.cropsService.getAll().subscribe(respuesta=>{

        this.Crops = respuesta;

        this.selectCrop=0;
      });

      this.purinService.getAll().subscribe(respuesta=>{

        this.RegPurin = respuesta;

      });

      this.mojadoFardosService.getAll().subscribe(respuesta=>{

        this.RegMojadoFardos = respuesta;

      });

      this.estacionadoFardosService.getAll().subscribe(respuesta=>{

        this.RegEstacionadoFardos = respuesta;

      });

      this.piscinaHumectacionService.getAll().subscribe(respuesta=>{

        this.RegPiscinaHumectacion = respuesta;

      });

      this.armadoCordonService.getAll().subscribe(respuesta=>{

        this.RegArmadoCordon = respuesta;

      });

      this.dia1Service.getAll().subscribe(respuesta=>{

        this.RegDia1 = respuesta;

      });

      this.dia2Service.getAll().subscribe(respuesta=>{

        this.RegDia2 = respuesta;

      });

      this.dia3Service.getAll().subscribe(respuesta=>{

        this.RegDia3 = respuesta;

      });

      this.dia4Service.getAll().subscribe(respuesta=>{

        this.RegDia4 = respuesta;

      });

      this.dia5Service.getAll().subscribe(respuesta=>{

        this.RegDia5 = respuesta;

      });

      this.heapService.getAll().subscribe(respuesta=>{

        this.RegHeap = respuesta;

      });

    }

    reset(){

      this.crop={
        key:0,
        nombre:'',
        fecha_creacion: null
      }
      this.etapa={
        id:0,
        nombre:""
      }
      this.regP=[];
      this.regMF=[];
      this.regEF=[];
      this.regPH=[];
      this.regAC=[];
      this.regD1=[];
      this.regD2=[];
      this.regD3=[];
      this.regD4=[];
      this.regD5=[];
      this.regH=[];

    }

    asignarId(id:any, tipo:string):void{

      switch (tipo) {

        case "crop":
        this.idReg=this.Crops.find(c => c.id==id);

        this.crop= this.idReg;
        break;

        case "SelCrop":

        this.idReg=this.CropsSeleccionados.find(c => c.id==id);

        this.crop= this.idReg;

        break;

        case "etapa":

        this.idReg=this.Etapas.find(e => e.id==id);

        this.etapa= this.idReg;

        break;

        case "SelEtapa":

        this.idReg=this.EtapasSeleccionadas.find(e => e.id==id);

        this.etapa= this.idReg;

        break;

        default:
        break;
      }

    }

    selCrop(){

      if (this.CropsSeleccionados.length<10) {
        this.limiteRegistro=true;
        this.CropsSeleccionados.unshift(this.crop);

        this.Crops = this.Crops.filter(c => c!=this.crop);

        this.reset();
      }else{
        this.limiteRegistro=false;
      }


    }

    deselCrop(){

      this.Crops.unshift(this.crop);

      this.CropsSeleccionados = this.CropsSeleccionados.filter(c => c!=this.crop);

      this.reset();
    }

    selEtapa(){

      this.EtapasSeleccionadas.unshift(this.etapa);

      this.Etapas = this.Etapas.filter(e => e!=this.etapa);

      this.reset();
    }

    deselEtapa(){

      this.Etapas.unshift(this.etapa);

      this.EtapasSeleccionadas = this.EtapasSeleccionadas.filter(e => e!=this.etapa);

      this.reset();
    }

    crearRegistros(tipo:string){

      this.reset();

      for (let i = 0; i < this.EtapasSeleccionadas.length; i++) {
        const etapa = this.EtapasSeleccionadas[i];

        switch (etapa.nombre) {

          case "Purin":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];


              for (let k = 0; k < this.RegPurin.length; k++) {
                const reg = this.RegPurin[k];

                if (cr.id == reg.crops_id) {
                  var regP ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Electroconductividad:reg.electroconductividad,
                    pH:reg.ph,
                    TDS:reg.tds,
                    Nitrogeno:reg.nitrogeno
                  }

                  this.regP.unshift(regP);

                }
              }
            }
            this.Registros[0]=this.regP;
            break;

          case "Mojado fardos":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegMojadoFardos.length; k++) {
                const reg = this.RegMojadoFardos[k];

                if (cr.id == reg.crops_id) {
                  var regMF ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Cantidad_fardos_usados:reg.num_fardos_usados,
                    Guias_despacho_usadas:reg.guias_despacho_usadas,
                    Peso_neto_guias:reg.peso_neto_guias,
                    Peso_fardos_premojado:reg.peso_fardos_premojado,
                    Peso_fardos_postmojado:reg.peso_fardos_postmojado,
                    Tiempo_hundido:reg.tiempo_hundido,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Fardos_perdidos_desarme:reg.fardos_perdidos_desarme
                  }

                  this.regMF.unshift(regMF);


                }
              }
            }
            this.Registros[1]=this.regMF;
            break;

          case "Estacionado fardos":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegEstacionadoFardos.length; k++) {
                const reg = this.RegEstacionadoFardos[k];

                if (cr.id == reg.crops_id) {
                  var regEF ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Porcentaje_sobre_pallet:reg.porcentaje_sobre_pallet,
                    Temperatura_promedio_Dia_i:reg.temp_promedio_diai,
                    Humedad_promedio_Dia_i:reg.humedad_promedio_diai,
                    Oxigeno_promedio_Dia_i:reg.oxigeno_promedio_diai,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total_estacionado:reg.tiempo_total_estacionado,
                    Calidad_estructura:reg.calidad_estructura,
                    Fardos_perdidos_desarme:reg.fardos_perdidos_desarme
                  }

                  this.regEF.unshift(regEF);

                }
              }
            }
            this.Registros[2]=this.regEF;
            break;

          case "Piscina humectacion":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegPiscinaHumectacion.length; k++) {
                const reg = this.RegPiscinaHumectacion[k];

                if (cr.id == reg.crops_id) {
                  var regPH ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Litros_humectacion_asistida:reg.litros_humect_asistida,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Horas_en_piscina:reg.horas_piscina_humect,
                    Numero_paladas_paja:reg.num_paladas_desarmada,
                    Peso_paja_desarmada:reg.peso_paja_desarmada
                  }

                  this.regPH.unshift(regPH);

                }
              }
            }
            this.Registros[3]=this.regPH;
            break;

          case "Armado cordon":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegArmadoCordon.length; k++) {
                const reg = this.RegArmadoCordon[k];

                if (cr.id == reg.crops_id) {
                  var regAC ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Cantidad_paladas_compostera:reg.num_paladas_compostera,
                    Peso_promedio_paladas:reg.peso_prom_paladas,
                    Peso_total:reg.peso_total,
                    Compostera_usada:reg.compostera_usada,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total:reg.tiempo_total,
                    Altura_cordon:reg.altura_cordon,
                    Ancho_cordon:reg.ancho_cordon,
                    Largo_cordon:reg.largo_cordon,
                    Temperatura:reg.temperatura,
                    Humedad:reg.humedad,
                    Oxigeno:reg.oxigeno
                  }
                  this.regAC.unshift(regAC);

                }
              }
            }
            this.Registros[4]=this.regAC;
            break;

          case "Dia 1 cordon (nitrog)":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegDia1.length; k++) {
                const reg = this.RegDia1[k];

                if (cr.id == reg.crops_id) {
                  var regD1 ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Fecha_inicio_primera_pasada:reg.fecha_inicio_pasada1,
                    Numero_paladas_primera_pasada:reg.num_paladas_guano1,
                    Peso_promedio_paladas_primera_pasada:reg.peso_prom_paladas1,
                    Peso_total_guano_fresco:reg.peso_total_guano1,
                    Cantidad_Sulfato_Amonio:reg.num_sulfato_amonio,
                    Cantidad_Urea:reg.num_urea,
                    Cantidad_Yeso:reg.num_yeso,
                    Fecha_termino_primera_pasada:reg.fecha_termino_pasada1,
                    Tiempo_total_primera_pasada:reg.tiempo_total_pasada1,
                    Fecha_inicio_segunda_pasada:reg.fecha_inicio_pasada2,
                    Numero_paladas_segunda_pasada:reg.num_paladas_guano2,
                    Peso_promedio_paladas_segunda_pasada:reg.peso_prom_paladas2,
                    Peso_total_guano_reproductora:reg.peso_total_guano2,
                    Fecha_termino_segunda_pasada:reg.fecha_termino_pasada2,
                    Tiempo_total_segunda_pasada:reg.tiempo_total_pasada2,
                    Fecha_inicio_tercera_pasada:reg.fecha_inicio_pasada3,
                    Numero_paladas_tercera_pasada:reg.num_paladas_guano3,
                    Peso_promedio_paladas_tercera_pasada:reg.peso_prom_paladas3,
                    Peso_total_guano:reg.peso_total_guano3,
                    Temperatura:reg.temperatura,
                    Humedad:reg.humedad,
                    Oxigeno:reg.oxigeno,
                    Compostera_usada:reg.compostera_usada
                  }

                  this.regD1.unshift(regD1);

                }
              }
            }
            this.Registros[5]=this.regD1;
            break;

          case "Dia 2 cordon (agua)":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegDia2.length; k++) {
                const reg = this.RegDia2[k];

                if (cr.id == reg.crops_id) {
                  var regD2 ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total:reg.tiempo_total,
                    Caudal_inicial:reg.caudal_inicial,
                    Caudal_final:reg.caudal_final,
                    Litros_agua_agregados:reg.litros_agua_agregados,
                    Litros_por_metro_lineal:reg.litros_metro_lineal,
                    Bajadas:reg.bajadas,
                    Temperatura:reg.temperatura,
                    Humedad:reg.humedad,
                    Oxigeno:reg.oxigeno,
                    Compostera_usada:reg.compostera_usada
                  }

                  this.regD2.unshift(regD2);

                }
              }
            }
            this.Registros[6]=this.regD2;
            break;

          case "Dia 3 cordon (ox)":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegDia3.length; k++) {
                const reg = this.RegDia3[k];

                if (cr.id == reg.crops_id) {
                  var regD3 ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total:reg.tiempo_total,
                    Temperatura:reg.temperatura,
                    Humedad:reg.humedad,
                    Oxigeno:reg.oxigeno,
                    Compostera_usada:reg.compostera_usada
                  }

                  this.regD3.unshift(regD3);

                }
              }
            }
            this.Registros[7]=this.regD3;
            break;

          case "Dia 4 cordon (agua)":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegDia4.length; k++) {
                const reg = this.RegDia4[k];

                if (cr.id == reg.crops_id) {
                  var regD4 ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total:reg.tiempo_total,
                    Caudal_inicial:reg.caudal_inicial,
                    Caudal_final:reg.caudal_final,
                    Litros_agua_agregados:reg.litros_agua_agregados,
                    Litros_por_metro_lineal:reg.litros_metro_lineal,
                    Bajadas:reg.bajadas,
                    Compostera_usada:reg.compostera_usada
                  }

                  this.regD4.unshift(regD4);
                }
              }
            }
            this.Registros[8]=this.regD4;
            break;

          case "Dia 5 FB":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegDia5.length; k++) {
                const reg = this.RegDia5[k];

                if (cr.id == reg.crops_id) {
                  var regD5 ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Fecha_inicio:reg.fecha_inicio,
                    Fecha_termino:reg.fecha_termino,
                    Tiempo_total:reg.tiempo_total,
                    Bunker:reg.bunker,
                    Numero_Spigots:reg.num_spigots,
                    Numero_paladas:reg.num_paladas,
                    Peso_promedio_paladas:reg.peso_prom_paladas,
                    Peso_total_llenado_bunker:reg.peso_total_llenado_bunker,
                    Peso_perdida_material:reg.peso_perdida_material,
                    Altura_llenado:reg.altura_llenado,
                    Humedad:reg.humedad,
                    pH:reg.ph
                  }

                  this.regD5.unshift(regD5);

                }
              }
            }
            this.Registros[9]=this.regD5;
            break;

          case "Heap":

            for (let j = 0; j < this.CropsSeleccionados.length; j++) {
              const cr = this.CropsSeleccionados[j];

              for (let k = 0; k < this.RegHeap.length; k++) {
                const reg = this.RegHeap[k];

                if (cr.id == reg.crops_id) {
                  var regH ={
                    Nombre_Crop:cr.nombre,
                    Etapa:etapa.nombre,
                    Amoniaco_AHNH3:reg.amoniaco,
                    Fecha_inicio_armado:reg.fecha_inicio_armado,
                    Fecha_termino_armado:reg.fecha_termino_armado,
                    Altura_heap:reg.altura_heap,
                    Ancho_heap:reg.ancho_heap,
                    Largo_heap:reg.largo_heap,
                    Numero_paladas:reg.num_paladas,
                    Peso_promedio_paladas:reg.peso_prom_paladas,
                    Peso_perdida_material:reg.peso_perdida_material
                  }

                  this.regH.unshift(regH);

                }
              }
            }
            this.Registros[10]=this.regH;
            break;

          default:
          break;
        }

      }

      switch (tipo) {
        case "exportar":
          this.exportService.exportExcel(this.Registros,"Registros");
          break;

        case "tabla":
          this.selectEtapaTabla=this.EtapasSeleccionadas[0].nombre;
          this.mostrarTabla=true;
          break;
        default:
          break;
      }


    }



  }
