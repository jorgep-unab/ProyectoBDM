export interface EstacionadoFardos{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    porcentaje_sobre_pallet:number;
    temp_promedio_diai:number;
    humedad_promedio_diai:number;
    oxigeno_promedio_diai:number;
    fecha_inicio:Date;
    fecha_termino: Date;
    tiempo_total_estacionado: number;
    calidad_estructura: string;
}
