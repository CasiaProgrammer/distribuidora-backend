export interface Pedido {
  id?: number;
  vendedor_id: number;
  fecha?: Date;
  estado: 'pendiente' | 'aprobado' | 'entregado';
  total?: number;
}

export interface DetallePedido {
  id?: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}