import { Time } from '@angular/common';

export interface Dia4{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    fecha_inicio:Date;
    fecha_termino: Date;
    tiempo_total:Time;
    caudal_inicial: number;
    caudal_final:number;
    litros_agua_agregados:number;
    litros_metro_lineal:number;
    bajadas:number;
    compostera_usada:string;
}
