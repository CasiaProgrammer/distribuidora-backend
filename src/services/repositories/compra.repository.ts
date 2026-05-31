import { Compra, DetalleCompra } from './domain/compra';

export interface CompraRepository {
  list(): Promise<Compra[]>;
  create(data: Compra): Promise<number>;
  actualizarTotal(id: number, subtotal: number): Promise<void>;
  addDetalle(detalle: DetalleCompra): Promise<number>;
  getDetalles(compra_id: number): Promise<DetalleCompra[]>;
}