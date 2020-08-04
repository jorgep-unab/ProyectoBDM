import { Time } from '@angular/common';

export interface Dia3{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    fecha_inicio:Date;
    fecha_termino:Date;
    tiempo_total:Time;
    temperatura:number;
    humedad: number;
    oxigeno: number;
    compostera_usada: string;
}
