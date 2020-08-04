import { Time } from '@angular/common';

export interface Dia5{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    fecha_inicio:Date;
    fecha_termino: Date;
    tiempo_total:Time;
    bunker:string;
    num_spigots:number;
    num_paladas:number;
    peso_prom_paladas: number;
    peso_total_llenado_bunker: number;
    peso_perdida_material: number;
    altura_llenado:number;
    humedad: number;
    ph: number;
}
