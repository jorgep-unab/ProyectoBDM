import { Time } from '@angular/common';

export interface ArmadoCordon{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    num_paladas_compostera:number;
    peso_promedio_paladas: number;
    peso_total: number;
    compostera_usada:string;
    fecha_inicio:Date;
    fecha_termino:Date;
    tiempo_total:Time;
    altura_cordon:number;
    ancho_cordon:number
    largo_cordon:number;
    temperatura: number;
    humedad: number;
    oxigeno: number;
}
