import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {




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
    selectEtapaGrafico:"";
    selectCrop:0;
    selectSelEtapa:0;
    selectSelCrop:0;

    idReg:any;
    public limiteRegistro:boolean;
    public mostrarGraficos:boolean = false;


    //Elementos para Gráficos
    public purinChartData: ChartDataSets[] = [];
    public purinChartLabels: Label[]=[
      'Electroconductividad (dS/m)',
      'pH ([H+])',
      'TDS (ppm)',
      'Nitrógeno (%)'
    ];

    public mojadoFardosChartData: ChartDataSets[] = [];
    public mojadoFardosChartLabels: Label[]=[
      'Peso neto guías de despacho (kg)',
      'Peso fardos pre-mojado (kg)',
      'Peso fardos post-mojado (kg)'
    ];

    public estacionadoFardosChartData: ChartDataSets[] = [];
    public estacionadoFardosChartLabels: Label[]=[
      'Fardos sobre pallet (%)',
      'Temperatura promedio dia i (°C)',
      'Humedad promedio dia i (%)',
      'Oxígeno promedio dia i (%)'
    ];

    public piscinaHumectacionChartData: ChartDataSets[] = [];
    public piscinaHumectacionChartLabels: Label[]=[
      'Litros humectación asistida (l)',
      'Horas en piscina (hrs)',
      'Peso paja desarmada (kg)'
    ];

    public armadoCordonChartData1: ChartDataSets[] = [];
    public armadoCordonChartLabels1: Label[]=[
      '# paladas a compostera',
      'Peso promedio (kg)',
      'Peso total (kg)',
      'Altura cordón (cm)',
      'Ancho cordón (cm)',
      'Largo cordón (cm)'
    ];
    public armadoCordonChartData2: ChartDataSets[] = [];
    public armadoCordonChartLabels2: Label[]=[
      'Temperatura (°C)',
      'Humedad (%)',
      'Oxígeno (%)'
    ];

    public dia1ChartData1: ChartDataSets[] = [];
    public dia1ChartLabels1: Label[]=[
      '# paladas de guano',
      'Peso promedio (kg)',
      'Peso total guano (kg)',
      'Sulfato de Amonio (kg)',
      'Urea (kg)',
      'Yeso (kg)'
    ];
    public dia1ChartData2: ChartDataSets[] = [];
    public dia1ChartLabels2: Label[]=[
      '# paladas de guano',
      'Peso promedio (kg)',
      'Peso total guano reproductora(kg)'
    ];
    public dia1ChartData3: ChartDataSets[] = [];
    public dia1ChartLabels3: Label[]=[
      '# paladas de guano',
      'Peso promedio (kg)',
      'Peso total guano (kg)'
    ];
    public dia1ChartData4: ChartDataSets[] = [];
    public dia1ChartLabels4: Label[]=[
      'Temperatura (°C)',
      'Humedad (%)',
      'Oxígeno (%)'
    ];

    public dia2ChartData1: ChartDataSets[] = [];
    public dia2ChartLabels1: Label[]=[
      'Caudal inicial (l)',
      'Caudal final (l)',
      'Litros de agua agregados',
      'Litros por metro lineal',
      'Bajadas'
    ];
    public dia2ChartData2: ChartDataSets[] = [];
    public dia2ChartLabels2: Label[]=[
      'Temperatura (°C)',
      'Humedad (%)',
      'Oxígeno (%)'
    ];

    public dia3ChartData: ChartDataSets[] = [];
    public dia3ChartLabels: Label[]=[
      'Temperatura (°C)',
      'Humedad (%)',
      'Oxígeno (%)'
    ];

    public dia4ChartData: ChartDataSets[] = [];
    public dia4ChartLabels: Label[]=[
      'Caudal inicial (l)',
      'Caudal final (l)',
      'Litros de agua agregados',
      'Litros por metro lineal',
      'Bajadas'
    ];

    public dia5ChartData1: ChartDataSets[] = [];
    public dia5ChartLabels1: Label[]=[
      'Cantidad de Spigots',
      'Cantidad de paladas',
      'Peso promedio paladas',
      'Peso total llenado búnker',
      'Peso pérdida material'
    ];
    public dia5ChartData2: ChartDataSets[] = [];
    public dia5ChartLabels2: Label[]=[
      'Altura llenado (cm)',
      'Humedad (%)'
      //'pH ([H+])'
    ];

    public heapChartData1: ChartDataSets[] = [];
    public heapChartLabels1: Label[]=[
      'Altura Heap (cm)',
      'Ancho Heap (cm)',
      'Largo Heap (cm)'
    ];
    public heapChartData2: ChartDataSets[] = [];
    public heapChartLabels2: Label[]=[
      'Cantidad de paladas',
      'Peso promedio paladas (kg)',
      'Peso pérdida de material (kg)'
    ];


    public graficosChartType = 'line';


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

      if (this.CropsSeleccionados.length<5) {
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
            this.graficar("purin");

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
            this.graficar("mojado");
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
            this.graficar("estacionado");
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
            this.graficar("piscina");
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
            this.graficar("armado");
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
            this.graficar("dia1");
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
            this.graficar("dia2");
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
            this.graficar("dia3");
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
            this.graficar("dia4");
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
            this.graficar("dia5");
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
            this.graficar("heap");
            break;

          default:
          break;
        }

      }

      this.selectEtapaGrafico=this.EtapasSeleccionadas[0].nombre;
      this.mostrarGraficos=true;

    }

    graficar(tipo:string){

      var nomSeleccionados = [];


      this.CropsSeleccionados.forEach(crop => {
        nomSeleccionados.push(crop.nombre);
      });

      switch (tipo) {

        case "purin":
          this.purinChartData = [];
          nomSeleccionados.forEach(select => {
            var promedios = [];
            var cantidadRegistros = 0;
            var promElectro = 0;
            var promPH = 0;
            var promTDS = 0;
            var promNitrog = 0;

            this.regP.forEach(purin => {

              if (purin.Nombre_Crop == select) {
                cantidadRegistros++;

                promElectro += Number(purin.Electroconductividad);
                promPH += Number(purin.pH);
                promTDS += Number(purin.TDS);
                promNitrog += Number(purin.Nitrogeno);
              }
            });

            if (cantidadRegistros>0) {
              promElectro=Number((promElectro/cantidadRegistros).toFixed(2));
              promPH=Number((promPH/cantidadRegistros).toFixed(2));
              promTDS=Number((promTDS/cantidadRegistros).toFixed(2));
              promNitrog=Number((promNitrog/cantidadRegistros).toFixed(2));
            }

            promedios.push(promElectro);
            promedios.push(promPH);
            promedios.push(promTDS);
            promedios.push(promNitrog);

            this.purinChartData.push({
              data: promedios,
              label: select
            });
          });

          break;

        case "mojado":
          this.mojadoFardosChartData = [];
          nomSeleccionados.forEach(select => {
            var promedios = [];
            var cantidadRegistros = 0;
            var promPesoGuias = 0;
            var promPesoPreMojado = 0;
            var promPesoPostMojado = 0;

            this.regMF.forEach(mojadoF => {

              if (mojadoF.Nombre_Crop == select) {
                cantidadRegistros++;

                promPesoGuias += Number(mojadoF.Peso_neto_guias);
                promPesoPreMojado += Number(mojadoF.Peso_fardos_premojado);
                promPesoPostMojado += Number(mojadoF.Peso_fardos_postmojado);

              }
            });

            if (cantidadRegistros>0) {
              promPesoGuias=Number((promPesoGuias/cantidadRegistros).toFixed(2));
              promPesoPreMojado=Number((promPesoPreMojado/cantidadRegistros).toFixed(2));
              promPesoPostMojado=Number((promPesoPostMojado/cantidadRegistros).toFixed(2));
            }

            promedios.push(promPesoGuias);
            promedios.push(promPesoPreMojado);
            promedios.push(promPesoPostMojado);


            this.mojadoFardosChartData.push({
              data: promedios,
              label: select
            });
          });

          break;

        case "estacionado":
          this.estacionadoFardosChartData = [];
          nomSeleccionados.forEach(select => {
            var promedios = [];
            var cantidadRegistros = 0;
            var promFardosPallet = 0;
            var promTemperatura = 0;
            var promHumedad = 0;
            var promOxigeno = 0;

            this.regEF.forEach(estacionadoF => {

              if (estacionadoF.Nombre_Crop == select) {
                cantidadRegistros++;

                promFardosPallet += Number(estacionadoF.Porcentaje_sobre_pallet);
                promTemperatura += Number(estacionadoF.Temperatura_promedio_Dia_i);
                promHumedad += Number(estacionadoF.Humedad_promedio_Dia_i);
                promOxigeno += Number(estacionadoF.Oxigeno_promedio_Dia_i);

              }
            });

            if (cantidadRegistros>0) {
              promFardosPallet=Number((promFardosPallet/cantidadRegistros).toFixed(2));
              promTemperatura=Number((promTemperatura/cantidadRegistros).toFixed(2));
              promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
              promOxigeno=Number((promOxigeno/cantidadRegistros).toFixed(2));
            }

            promedios.push(promFardosPallet);
            promedios.push(promTemperatura);
            promedios.push(promHumedad);
            promedios.push(promOxigeno);


            this.estacionadoFardosChartData.push({
              data: promedios,
              label: select
            });
          });

          break;

          case "piscina":
            this.piscinaHumectacionChartData = [];
            nomSeleccionados.forEach(select => {
              var promedios = [];
              var cantidadRegistros = 0;
              var promLitros = 0;
              var promHoras = 0;
              var promPesoPaja = 0;


              this.regPH.forEach(piscina => {

                if (piscina.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promLitros += Number(piscina.Litros_humectacion_asistida);
                  promHoras += Number(piscina.Horas_en_piscina);
                  promPesoPaja += Number(piscina.Peso_paja_desarmada);

                }
              });

              if (cantidadRegistros>0) {
                promLitros=Number((promLitros/cantidadRegistros).toFixed(2));
                promHoras=Number((promHoras/cantidadRegistros).toFixed(2));
                promPesoPaja=Number((promPesoPaja/cantidadRegistros).toFixed(2));
              }

              promedios.push(promLitros);
              promedios.push(promHoras);
              promedios.push(promPesoPaja);


              this.piscinaHumectacionChartData.push({
                data: promedios,
                label: select
              });
            });

            break;

          case "armado":
            this.armadoCordonChartData1 = [];
            this.armadoCordonChartData2 = [];
            nomSeleccionados.forEach(select => {
              var promedios1 = [];
              var promedios2 = [];

              var cantidadRegistros = 0;
              var promNumPaladas = 0;
              var promPesoPaladas = 0;
              var promPesoTotal = 0;
              var promAltura = 0;
              var promAncho = 0;
              var promLargo = 0;

              var promTemperatura = 0;
              var promHumedad = 0;
              var promOxigeno = 0;


              this.regAC.forEach(armado => {

                if (armado.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promNumPaladas += Number(armado.Cantidad_paladas_compostera);
                  promPesoPaladas += Number(armado.Peso_promedio_paladas);
                  promPesoTotal += Number(armado.Peso_total);
                  promAltura += Number(armado.Altura_cordon);
                  promAncho += Number(armado.Ancho_cordon);
                  promLargo += Number(armado.Largo_cordon);

                  promTemperatura += Number(armado.Temperatura);
                  promHumedad += Number(armado.Humedad);
                  promOxigeno += Number(armado.Oxigeno);

                }
              });

              if (cantidadRegistros>0) {
                promNumPaladas=Number((promNumPaladas/cantidadRegistros).toFixed(2));
                promPesoPaladas=Number((promPesoPaladas/cantidadRegistros).toFixed(2));
                promPesoTotal=Number((promPesoTotal/cantidadRegistros).toFixed(2));
                promAltura=Number((promAltura/cantidadRegistros).toFixed(2));
                promAncho=Number((promAncho/cantidadRegistros).toFixed(2));
                promLargo=Number((promLargo/cantidadRegistros).toFixed(2));

                promTemperatura=Number((promTemperatura/cantidadRegistros).toFixed(2));
                promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
                promOxigeno=Number((promOxigeno/cantidadRegistros).toFixed(2));
              }

              promedios1.push(promNumPaladas);
              promedios1.push(promPesoPaladas);
              promedios1.push(promPesoTotal);
              promedios1.push(promAltura);
              promedios1.push(promAncho);
              promedios1.push(promLargo);

              promedios2.push(promTemperatura);
              promedios2.push(promHumedad);
              promedios2.push(promOxigeno);


              this.armadoCordonChartData1.push({
                data: promedios1,
                label: select
              });

              this.armadoCordonChartData2.push({
                data: promedios2,
                label: select
              });
            });

            break;

          case "dia1":
            this.dia1ChartData1 = [];
            this.dia1ChartData2 = [];
            this.dia1ChartData3 = [];
            this.dia1ChartData4 = [];
            nomSeleccionados.forEach(select => {
              var promedios1 = [];
              var promedios2 = [];
              var promedios3 = [];
              var promedios4 = [];

              var cantidadRegistros = 0;

              var promNumPaladas1 = 0;
              var promPesoPaladas1 = 0;
              var promPesoTotal1 = 0;
              var promSulfato = 0;
              var promUrea = 0;
              var promYeso = 0;

              var promNumPaladas2 = 0;
              var promPesoPaladas2 = 0;
              var promPesoTotal2 = 0;

              var promNumPaladas3 = 0;
              var promPesoPaladas3 = 0;
              var promPesoTotal3 = 0;
              var promTemperatura = 0;
              var promHumedad = 0;
              var promOxigeno = 0;

              this.regD1.forEach(d1 => {

                if (d1.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promNumPaladas1 += Number(d1.Numero_paladas_primera_pasada);
                  promPesoPaladas1 += Number(d1.Peso_promedio_paladas_primera_pasada);
                  promPesoTotal1 += Number(d1.Peso_total_guano_fresco);
                  promSulfato += Number(d1.Cantidad_Sulfato_Amonio);
                  promUrea += Number(d1.Cantidad_Urea);
                  promYeso += Number(d1.Cantidad_Yeso);

                  promNumPaladas2 += Number(d1.Numero_paladas_segunda_pasada);
                  promPesoPaladas2 += Number(d1.Peso_promedio_paladas_segunda_pasada);
                  promPesoTotal2 += Number(d1.Peso_total_guano_reproductora);

                  promNumPaladas3 += Number(d1.Numero_paladas_tercera_pasada);
                  promPesoPaladas3 += Number(d1.Peso_promedio_paladas_tercera_pasada);
                  promPesoTotal3 += Number(d1.Peso_total_guano);
                  promTemperatura += Number(d1.Temperatura);
                  promHumedad += Number(d1.Humedad);
                  promOxigeno += Number(d1.Oxigeno);

                }
              });

              if (cantidadRegistros>0) {
                promNumPaladas1=Number((promNumPaladas1/cantidadRegistros).toFixed(2));
                promPesoPaladas1=Number((promPesoPaladas1/cantidadRegistros).toFixed(2));
                promPesoTotal1=Number((promPesoTotal1/cantidadRegistros).toFixed(2));
                promSulfato=Number((promSulfato/cantidadRegistros).toFixed(2));
                promUrea=Number((promUrea/cantidadRegistros).toFixed(2));
                promYeso=Number((promYeso/cantidadRegistros).toFixed(2));

                promNumPaladas2=Number((promNumPaladas2/cantidadRegistros).toFixed(2));
                promPesoPaladas2=Number((promPesoPaladas2/cantidadRegistros).toFixed(2));
                promPesoTotal2=Number((promPesoTotal2/cantidadRegistros).toFixed(2));

                promNumPaladas3=Number((promNumPaladas3/cantidadRegistros).toFixed(2));
                promPesoPaladas3=Number((promPesoPaladas3/cantidadRegistros).toFixed(2));
                promPesoTotal3=Number((promPesoTotal3/cantidadRegistros).toFixed(2));
                promTemperatura=Number((promTemperatura/cantidadRegistros).toFixed(2));
                promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
                promOxigeno=Number((promOxigeno/cantidadRegistros).toFixed(2));
              }

              promedios1.push(promNumPaladas1);
              promedios1.push(promPesoPaladas1);
              promedios1.push(promPesoTotal1);
              promedios1.push(promSulfato);
              promedios1.push(promUrea);
              promedios1.push(promYeso);

              promedios2.push(promNumPaladas2);
              promedios2.push(promPesoPaladas2);
              promedios2.push(promPesoTotal2);

              promedios3.push(promNumPaladas3);
              promedios3.push(promPesoPaladas3);
              promedios3.push(promPesoTotal3);

              promedios4.push(promTemperatura);
              promedios4.push(promHumedad);
              promedios4.push(promOxigeno);


              this.dia1ChartData1.push({
                data: promedios1,
                label: select
              });

              this.dia1ChartData2.push({
                data: promedios2,
                label: select
              });

              this.dia1ChartData3.push({
                data: promedios3,
                label: select
              });

              this.dia1ChartData4.push({
                data: promedios4,
                label: select
              });
            });

            break;

          case "dia2":
            this.dia2ChartData1 = [];
            this.dia2ChartData2 = [];
            nomSeleccionados.forEach(select => {
              var promedios1 = [];
              var promedios2 = [];

              var cantidadRegistros = 0;
              var promCaudalIni = 0;
              var promCaudalFin = 0;
              var promLitrosAgregados = 0;
              var promLitrosMetro = 0;
              var promBajadas = 0;

              var promTemperatura = 0;
              var promHumedad = 0;
              var promOxigeno = 0;


              this.regD2.forEach(dia2 => {

                if (dia2.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promCaudalIni += Number(dia2.Caudal_inicial);
                  promCaudalFin += Number(dia2.Caudal_final);
                  promLitrosAgregados += Number(dia2.Litros_agua_agregados);
                  promLitrosMetro += Number(dia2.Litros_por_metro_lineal);
                  promBajadas += Number(dia2.Bajadas);


                  promTemperatura += Number(dia2.Temperatura);
                  promHumedad += Number(dia2.Humedad);
                  promOxigeno += Number(dia2.Oxigeno);

                }
              });

              if (cantidadRegistros>0) {
                promCaudalIni=Number((promCaudalIni/cantidadRegistros).toFixed(2));
                promCaudalFin=Number((promCaudalFin/cantidadRegistros).toFixed(2));
                promLitrosAgregados=Number((promLitrosAgregados/cantidadRegistros).toFixed(2));
                promLitrosMetro=Number((promLitrosMetro/cantidadRegistros).toFixed(2));
                promBajadas=Number((promBajadas/cantidadRegistros).toFixed(2));


                promTemperatura=Number((promTemperatura/cantidadRegistros).toFixed(2));
                promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
                promOxigeno=Number((promOxigeno/cantidadRegistros).toFixed(2));
              }

              promedios1.push(promCaudalIni);
              promedios1.push(promCaudalFin);
              promedios1.push(promLitrosAgregados);
              promedios1.push(promLitrosMetro);
              promedios1.push(promBajadas);

              promedios2.push(promTemperatura);
              promedios2.push(promHumedad);
              promedios2.push(promOxigeno);


              this.dia2ChartData1.push({
                data: promedios1,
                label: select
              });

              this.dia2ChartData2.push({
                data: promedios2,
                label: select
              });
            });

            break;

          case "dia3":
            this.dia3ChartData = [];
            nomSeleccionados.forEach(select => {
              var promedios = [];
              var cantidadRegistros = 0;

              var promTemperatura = 0;
              var promHumedad = 0;
              var promOxigeno = 0;

              this.regD3.forEach(dia3 => {

                if (dia3.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promTemperatura += Number(dia3.Temperatura);
                  promHumedad += Number(dia3.Humedad);
                  promOxigeno += Number(dia3.Oxigeno);

                }
              });

              if (cantidadRegistros>0) {

                promTemperatura=Number((promTemperatura/cantidadRegistros).toFixed(2));
                promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
                promOxigeno=Number((promOxigeno/cantidadRegistros).toFixed(2));
              }

              promedios.push(promTemperatura);
              promedios.push(promHumedad);
              promedios.push(promOxigeno);


              this.dia3ChartData.push({
                data: promedios,
                label: select
              });

            });

            break;

          case "dia4":
            this.dia4ChartData = [];
            nomSeleccionados.forEach(select => {
              var promedios = [];

              var cantidadRegistros = 0;
              var promCaudalIni = 0;
              var promCaudalFin = 0;
              var promLitrosAgregados = 0;
              var promLitrosMetro = 0;
              var promBajadas = 0;

              this.regD4.forEach(dia4 => {

                if (dia4.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promCaudalIni += Number(dia4.Caudal_inicial);
                  promCaudalFin += Number(dia4.Caudal_final);
                  promLitrosAgregados += Number(dia4.Litros_agua_agregados);
                  promLitrosMetro += Number(dia4.Litros_por_metro_lineal);
                  promBajadas += Number(dia4.Bajadas);
                }
              });

              if (cantidadRegistros>0) {
                promCaudalIni=Number((promCaudalIni/cantidadRegistros).toFixed(2));
                promCaudalFin=Number((promCaudalFin/cantidadRegistros).toFixed(2));
                promLitrosAgregados=Number((promLitrosAgregados/cantidadRegistros).toFixed(2));
                promLitrosMetro=Number((promLitrosMetro/cantidadRegistros).toFixed(2));
                promBajadas=Number((promBajadas/cantidadRegistros).toFixed(2));

              }

              promedios.push(promCaudalIni);
              promedios.push(promCaudalFin);
              promedios.push(promLitrosAgregados);
              promedios.push(promLitrosMetro);
              promedios.push(promBajadas);

              this.dia4ChartData.push({
                data: promedios,
                label: select
              });

            });

            break;

          case "dia5":
            this.dia5ChartData1 = [];
            this.dia5ChartData2 = [];
            nomSeleccionados.forEach(select => {
              var promedios1 = [];
              var promedios2 = [];

              var cantidadRegistros = 0;
              var promSpigots = 0;
              var promNumPaladas = 0;
              var promPesoPaladas = 0;
              var promPesoBunker = 0;
              var promPesoPerdida = 0;

              var promAlturallenado = 0;
              var promHumedad = 0;
              //var promPH = 0;


              this.regD5.forEach(dia5 => {

                if (dia5.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promSpigots += Number(dia5.Numero_Spigots);
                  promNumPaladas += Number(dia5.Numero_paladas);
                  promPesoPaladas += Number(dia5.Peso_promedio_paladas);
                  promPesoBunker += Number(dia5.Peso_total_llenado_bunker);
                  promPesoPerdida += Number(dia5.Peso_perdida_material);

                  promAlturallenado += Number(dia5.Altura_llenado);
                  promHumedad += Number(dia5.Humedad);
                  //promPH += Number(dia5.pH);

                }
              });

              if (cantidadRegistros>0) {
                promSpigots=Number((promSpigots/cantidadRegistros).toFixed(2));
                promNumPaladas=Number((promNumPaladas/cantidadRegistros).toFixed(2));
                promPesoPaladas=Number((promPesoPaladas/cantidadRegistros).toFixed(2));
                promPesoBunker=Number((promPesoBunker/cantidadRegistros).toFixed(2));
                promPesoPerdida=Number((promPesoPerdida/cantidadRegistros).toFixed(2));


                promAlturallenado=Number((promAlturallenado/cantidadRegistros).toFixed(2));
                promHumedad=Number((promHumedad/cantidadRegistros).toFixed(2));
                //promPH=Number((promPH/cantidadRegistros).toFixed(2));
              }

              promedios1.push(promSpigots);
              promedios1.push(promNumPaladas);
              promedios1.push(promPesoPaladas);
              promedios1.push(promPesoBunker);
              promedios1.push(promPesoPerdida);

              promedios2.push(promAlturallenado);
              promedios2.push(promHumedad);
              //promedios2.push(promPH);


              this.dia5ChartData1.push({
                data: promedios1,
                label: select
              });

              this.dia5ChartData2.push({
                data: promedios2,
                label: select
              });
            });

            break;

          case "heap":
            this.heapChartData1 = [];
            this.heapChartData2 = [];
            nomSeleccionados.forEach(select => {
              var promedios1 = [];
              var promedios2 = [];

              var cantidadRegistros = 0;

              var promAlturaHeap = 0;
              var promAnchoHeap = 0;
              var promLargoHeap = 0;

              var promNumPaladas = 0;
              var promPesoPaladas = 0;
              var promPesoPerdida = 0;


              this.regH.forEach(heap => {

                if (heap.Nombre_Crop == select) {
                  cantidadRegistros++;

                  promAlturaHeap += Number(heap.Altura_heap);
                  promAnchoHeap += Number(heap.Ancho_heap);
                  promLargoHeap += Number(heap.Largo_heap);

                  promNumPaladas += Number(heap.Numero_paladas);
                  promPesoPaladas += Number(heap.Peso_promedio_paladas);
                  promPesoPerdida += Number(heap.Peso_perdida_material);


                }
              });

              if (cantidadRegistros>0) {

                promAlturaHeap=Number((promAlturaHeap/cantidadRegistros).toFixed(2));
                promAnchoHeap=Number((promAnchoHeap/cantidadRegistros).toFixed(2));
                promLargoHeap=Number((promLargoHeap/cantidadRegistros).toFixed(2));

                promNumPaladas=Number((promNumPaladas/cantidadRegistros).toFixed(2));
                promPesoPaladas=Number((promPesoPaladas/cantidadRegistros).toFixed(2));
                promPesoPerdida=Number((promPesoPerdida/cantidadRegistros).toFixed(2));

              }

              promedios1.push(promAlturaHeap);
              promedios1.push(promAnchoHeap);
              promedios1.push(promLargoHeap);

              promedios2.push(promNumPaladas);
              promedios2.push(promPesoPaladas);
              promedios2.push(promPesoPerdida);


              this.heapChartData1.push({
                data: promedios1,
                label: select
              });

              this.heapChartData2.push({
                data: promedios2,
                label: select
              });
            });

            break;

        default:
          break;
      }

    }





}
