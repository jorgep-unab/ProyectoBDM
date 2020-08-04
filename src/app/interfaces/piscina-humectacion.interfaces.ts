export interface PiscinaHumectacion{
    id:number;
    crops_id:number;
    etapas_id:number;
    usuarios_id:number;
    litros_humect_asistida: number;
    fecha_inicio: Date;
    fecha_termino: Date;
    horas_piscina_humect:number;
    num_paladas_desarmada: number;
    peso_paja_desarmada: number;
}
