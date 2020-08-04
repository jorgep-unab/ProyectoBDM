export interface MojadoFardos {
  id:number;
  crops_id:number;
  etapas_id:number;
  usuarios_id:number;
  num_fardos_usados:number;
  guias_despacho_usadas:number;
  peso_neto_guias:number;
  peso_fardos_premojado:number;
  peso_fardos_postmojado:number;
  tiempo_hundido:number;
  fecha_inicio:Date;
  fecha_termino:Date;
  fardos_perdidos_desarme:number;
}
