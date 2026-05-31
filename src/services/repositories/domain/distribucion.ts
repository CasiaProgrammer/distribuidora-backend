export interface Distribucion {
  id?: number;
  pedido_id: number;
  fecha?: Date;
  estado: 'completo' | 'incompleto';
  observaciones?: string;
}