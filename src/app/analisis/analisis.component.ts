import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import MLR from 'ngx-regression-multivariate-linear';

//Servicios de las etapas
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

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})

/** Clase que representa al componente de análisis */
export class AnalisisComponent implements OnInit {

  //Variables para la verificación de sesión y permisos
  sesion:boolean;
  permisos:string;


  cargando:boolean;
  analizado:boolean;
  calculado:boolean;


  //Variables para de la regresión y
  //calculo del rendimiento
  datos = {

    pHPurin:0,
    nitrogeno:0,
    fardos:0,
    temperatura:0,
    humedad:0,
    oxigeno:0,
    litros_humectacion:0,
    horas_piscina:0,
    guano_1:0,
    guano_2:0,
    guano_3:0,
    sulfato_amonio:0,
    urea:0,
    yeso:0,
    pHDia5:0,
    amoniaco:0
  };
  regMin:Number;
  coeficientes = [];
  rendimiento:any;

  //Registros de las etapas
  public RegistrosPurin:any[] = [];
  public RegistrosMojadoFardos:any[] = [];
  public RegistrosEstacionadoFardos:any[] = [];
  public RegistrosArmadoCordon:any[] = [];
  public RegistrosPiscinaH:any[] = [];
  public RegistrosDia1:any[] = [];
  public RegistrosDia2:any[] = [];
  public RegistrosDia3:any[] = [];
  public RegistrosDia4:any[] = [];
  public RegistrosDia5:any[] = [];
  public RegistrosHeap:any[] = [];


  constructor(private cookieService: CookieService,
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
              private heapService:HeapService,) { }

  /** Método ejecutado tras inicializar el componente 
  *   
  */
  ngOnInit() {

    this.analizado=false;

    //Obtención de la sesión y revisión del permiso
    //de acceso al módulo
    this.sesion = this.cookieService.check('Usuario');

    if (this.sesion) {
      this.permisos = this.cookieService.get('Permisos');
    }

    this.obtenerRegistros();

  }

  /** Implementa los servicios de las etapas para 
   *  obtener los registros
   */
  obtenerRegistros(){

    if (this.RegistrosPurin.length==0) {
      this.purinService.getAll().subscribe(respuesta=>{

        this.RegistrosPurin = respuesta;
        
      });
    }
    
    if (this.RegistrosMojadoFardos.length==0) {
      this.mojadoFardosService.getAll().subscribe(respuesta=>{

        this.RegistrosMojadoFardos = respuesta;
        
      });
    }

    if (this.RegistrosEstacionadoFardos.length==0) {
      this.estacionadoFardosService.getAll().subscribe(respuesta=>{

        this.RegistrosEstacionadoFardos = respuesta;
        
      });
    }

    if (this.RegistrosPiscinaH.length==0) {
      this.piscinaHumectacionService.getAll().subscribe(respuesta=>{

        this.RegistrosPiscinaH = respuesta;
        
      });
    }

    if (this.RegistrosArmadoCordon.length==0) {
      this.armadoCordonService.getAll().subscribe(respuesta=>{

        this.RegistrosArmadoCordon = respuesta;
        
      });
    }

    if (this.RegistrosDia1.length==0) {
      this.dia1Service.getAll().subscribe(respuesta=>{

        this.RegistrosDia1 = respuesta;
        
      });
    }

    if (this.RegistrosDia2.length==0) {
      this.dia2Service.getAll().subscribe(respuesta=>{

        this.RegistrosDia2 = respuesta;
        
      });
    }

    if (this.RegistrosDia3.length==0) {
      this.dia3Service.getAll().subscribe(respuesta=>{

        this.RegistrosDia3 = respuesta;
        
      });
    }

    if (this.RegistrosDia4.length==0) {
      this.dia4Service.getAll().subscribe(respuesta=>{

        this.RegistrosDia4 = respuesta;
        
      });
    }

    if (this.RegistrosMojadoFardos.length==0) {
      this.dia5Service.getAll().subscribe(respuesta=>{

        this.RegistrosDia5 = respuesta;
        
      });
    }

    if (this.RegistrosHeap.length==0) {
      this.heapService.getAll().subscribe(respuesta=>{

        this.RegistrosHeap = respuesta;

      });
    }
    
  }

  /** Genera una regresión lineal multivariable a
   *  partir de los datos de las etapas
   */
  generarRegresion(){

      this.cargando=true;
    
      //Identifica cuantos registros completos existen
      //asignandolo a la variable de la clase componente
      var reg =[this.RegistrosPurin.length,
              this.RegistrosMojadoFardos.length,
              this.RegistrosEstacionadoFardos.length,
              this.RegistrosPiscinaH.length,
              this.RegistrosArmadoCordon.length,
              this.RegistrosDia1.length,
              this.RegistrosDia2.length,
              this.RegistrosDia3.length,
              this.RegistrosDia4.length,
              this.RegistrosDia5.length,
              this.RegistrosHeap.length]

      this.regMin = Math.min.apply(null, reg);


      if (this.regMin!=0) {
        //Asigna los datos de las etapas a
        //variables X para la regresión.
        var x = [];
        for (let i = 0; i < this.regMin; i++) {

          x[i] = [Number(this.RegistrosPurin[i].ph),
                  Number(this.RegistrosPurin[i].nitrogeno),
                  Number(this.RegistrosMojadoFardos[i].num_fardos_usados),

                  (Number(this.RegistrosEstacionadoFardos[i].temp_promedio_diai)+
                  Number(this.RegistrosArmadoCordon[i].temperatura)+
                  Number(this.RegistrosDia1[i].temperatura)+
                  Number(this.RegistrosDia2[i].temperatura)+
                  Number(this.RegistrosDia3[i].temperatura))/5,

                  (Number(this.RegistrosEstacionadoFardos[i].humedad_promedio_diai)+
                  Number(this.RegistrosArmadoCordon[i].humedad)+
                  Number(this.RegistrosDia1[i].humedad)+
                  Number(this.RegistrosDia2[i].humedad)+
                  Number(this.RegistrosDia3[i].humedad))/5,

                  (Number(this.RegistrosEstacionadoFardos[i].oxigeno_promedio_diai)+
                  Number(this.RegistrosArmadoCordon[i].oxigeno)+
                  Number(this.RegistrosDia1[i].oxigeno)+
                  Number(this.RegistrosDia2[i].oxigeno)+
                  Number(this.RegistrosDia3[i].oxigeno))/5,

                  Number(this.RegistrosPiscinaH[i].litros_humect_asistida),
                  Number(this.RegistrosPiscinaH[i].horas_piscina_humect),
                  Number(this.RegistrosDia1[i].peso_total_guano1),
                  Number(this.RegistrosDia1[i].peso_total_guano2),
                  Number(this.RegistrosDia1[i].peso_total_guano3),
                  Number(this.RegistrosDia1[i].num_sulfato_amonio),
                  Number(this.RegistrosDia1[i].num_urea),
                  Number(this.RegistrosDia1[i].num_yeso),
                  Number(this.RegistrosDia5[i].ph),
                  Number(this.RegistrosHeap[i].amoniaco)
                  ];

        }

        //Asigna un valor de rendimiento aleatorio a
        //cada conjunto de una variable X.

        //El rendimiento es generado aleatoriamente 
        //entre los valores 13 y 27 con fines demostrativos y
        //debe modificarse la fórmula en el futuro
        //para resultados realistas
        var y = [];
        var rendimiento:Number;

        
        for (let i = 0; i < x.length; i++) {

          
            this.datos.pHPurin=this.datos.pHPurin+x[i][0],
            this.datos.nitrogeno=this.datos.nitrogeno+x[i][1],
            this.datos.fardos=this.datos.fardos+x[i][2],
            this.datos.temperatura=this.datos.temperatura+x[i][3],
            this.datos.humedad=this.datos.humedad+x[i][4],
            this.datos.oxigeno=this.datos.oxigeno+x[i][5],
            this.datos.litros_humectacion=this.datos.litros_humectacion+x[i][6],
            this.datos.horas_piscina=this.datos.horas_piscina+x[i][7],
            this.datos.guano_1=this.datos.guano_1+x[i][8],
            this.datos.guano_2=this.datos.guano_2+x[i][9],
            this.datos.guano_3=this.datos.guano_3+x[i][10],
            this.datos.sulfato_amonio=this.datos.sulfato_amonio+x[i][11],
            this.datos.urea=this.datos.urea+x[i][12],
            this.datos.yeso=this.datos.yeso+x[i][13],
            this.datos.pHDia5=this.datos.pHDia5+x[i][14],
            this.datos.amoniaco=this.datos.amoniaco+x[i][15]
          

          rendimiento = Number((Math.random() * (27 - 13) + 13).toFixed(2));
          
          y[i] = [rendimiento];
      
        }

        //Calculo de los promedios para el formulario
        this.datos.pHPurin=Number((this.datos.pHPurin/x.length).toFixed(5));
        this.datos.nitrogeno=Number((this.datos.nitrogeno/x.length).toFixed(5));
        this.datos.fardos=Number((this.datos.fardos/x.length).toFixed(5));
        this.datos.temperatura=Number((this.datos.temperatura/x.length).toFixed(5));
        this.datos.humedad=Number((this.datos.humedad/x.length).toFixed(5));
        this.datos.oxigeno=Number((this.datos.oxigeno/x.length).toFixed(5));
        this.datos.litros_humectacion=Number((this.datos.litros_humectacion/x.length).toFixed(5));
        this.datos.horas_piscina=Number((this.datos.horas_piscina/x.length).toFixed(5));
        this.datos.guano_1=Number((this.datos.guano_1/x.length).toFixed(5));
        this.datos.guano_2=Number((this.datos.guano_2/x.length).toFixed(5));
        this.datos.guano_3=Number((this.datos.guano_3/x.length).toFixed(5));
        this.datos.sulfato_amonio=Number((this.datos.sulfato_amonio/x.length).toFixed(5));
        this.datos.urea=Number((this.datos.urea/x.length).toFixed(5));
        this.datos.yeso=Number((this.datos.yeso/x.length).toFixed(5));
        this.datos.pHDia5=Number((this.datos.pHDia5/x.length).toFixed(5));
        this.datos.amoniaco=Number((this.datos.amoniaco/x.length).toFixed(5));



        //Genera la regresión con los valores X e Y
        const mlr = new MLR(x, y);

        //Extracción de los coeficientes obtenidos
        //mediante la regresión
        var regresion = mlr.toJSON();
        var variables = regresion.summary.variables;

        

        for (let i = 0; i < variables.length-1; i++) {
          
          this.coeficientes[i] = variables[i].coefficients[0];
          
        }

        setTimeout(() => {
          this.cargando=false;
          this.analizado=true;
        }, 1000);
        
        
        


        }

      

  }


  /** Utiliza los coeficientes de la regresión
   *  y los valores ingresados por el usuario
   *  para el cálculo del rendimiento esperado
   */
  calcularRendimiento(){

      //Los calculos son sumados por separados en caso de añadir o quitar
      //variables en el futuro
      this.rendimiento = 0;

      this.rendimiento = this.rendimiento + this.coeficientes[0]*this.datos.pHPurin;

      this.rendimiento = this.rendimiento + this.coeficientes[1]*this.datos.nitrogeno;

      this.rendimiento = this.rendimiento + this.coeficientes[2]*this.datos.fardos;

      this.rendimiento = this.rendimiento + this.coeficientes[3]*this.datos.temperatura;
      
      this.rendimiento = this.rendimiento + this.coeficientes[4]*this.datos.humedad;
      
      this.rendimiento = this.rendimiento + this.coeficientes[5]*this.datos.oxigeno;
      
      this.rendimiento = this.rendimiento + this.coeficientes[6]*this.datos.litros_humectacion;
      
      this.rendimiento = this.rendimiento + this.coeficientes[7]*this.datos.horas_piscina;
      
      this.rendimiento = this.rendimiento + this.coeficientes[8]*this.datos.guano_1;
      
      this.rendimiento = this.rendimiento + this.coeficientes[9]*this.datos.guano_2;
      
      this.rendimiento = this.rendimiento + this.coeficientes[10]*this.datos.guano_3;
      
      this.rendimiento = this.rendimiento + this.coeficientes[11]*this.datos.sulfato_amonio;
      
      this.rendimiento = this.rendimiento + this.coeficientes[12]*this.datos.urea;
      
      this.rendimiento = this.rendimiento + this.coeficientes[13]*this.datos.yeso;
      
      this.rendimiento = this.rendimiento + this.coeficientes[14]*this.datos.pHDia5;

      this.rendimiento = this.rendimiento + this.coeficientes[15]*this.datos.amoniaco;

      this.calculado=true;
    
  }



}
