import { Time } from '@angular/common';

export interface Dia1{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    fecha_inicio_pasada1:Date;
    num_paladas_guano1:number;
    peso_prom_paladas1:number;
    peso_total_guano1:number;
    num_sulfato_amonio:number;
    num_urea:number;
    num_yeso:number;
    fecha_termino_pasada1:Date;
    tiempo_total_pasada1:Time;
    fecha_inicio_pasada2:Date;
    num_paladas_guano2:number;
    peso_prom_paladas2:number;
    peso_total_guano2:number;
    fecha_termino_pasada2:Date;
    tiempo_total_pasada2:Time;
    fecha_inicio_pasada3:Date;
    num_paladas_guano3:number;
    peso_prom_paladas3:number;
    peso_total_guano3:number;
    temperatura: number;
    humedad: number;
    oxigeno: number;
    compostera_usada: string
}
