export interface Comision {
  id?: number;
  vendedor_id: number;
  pedido_id: number;
  monto: number;
  porcentaje: number;
  fecha?: Date;
}