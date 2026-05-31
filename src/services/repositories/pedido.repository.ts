import { Pedido, DetallePedido } from './domain/pedido';

export interface PedidoRepository {
  list(): Promise<Pedido[]>;
  getById(id: number): Promise<Pedido | null>;
  getByVendedor(vendedor_id: number): Promise<Pedido[]>;
  create(data: Pedido): Promise<number>;
  updateEstado(id: number, estado: string): Promise<void>;
  actualizarTotal(id: number, subtotal: number): Promise<void>;
  addDetalle(detalle: DetallePedido): Promise<number>;
  getDetalles(pedido_id: number): Promise<DetallePedido[]>;
}