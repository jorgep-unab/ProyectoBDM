import { PatternValidator } from '@angular/forms';

export interface Heap{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    amoniaco:number;
    fecha_inicio_armado:Date;
    fecha_termino_armado:Date;
    altura_heap:number;
    ancho_heap:number;
    largo_heap:number;
    num_paladas: number;
    peso_prom_paladas:number;
    peso_perdida_material:number;
}
