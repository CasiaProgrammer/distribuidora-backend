export interface Combustible {
  id?: number;
  vehiculo_id: number;
  fecha?: Date;
  galones: number;
  precio_galon: number;
  total: number;
  km_recorridos?: number;
  observaciones?: string;
}