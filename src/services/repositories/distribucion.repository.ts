import { Distribucion } from './domain/distribucion';

export interface DistribucionRepository {
  list(): Promise<Distribucion[]>;
  getByPedido(pedido_id: number): Promise<Distribucion | null>;
  create(data: Distribucion): Promise<number>;
  update(id: number, data: Partial<Distribucion>): Promise<void>;
}