import { DistribucionRepository } from './repositories/distribucion.repository';
import { Distribucion } from './repositories/domain/distribucion';

export class DistribucionService {
  constructor(private distribucionRepository: DistribucionRepository) {}

  list() { return this.distribucionRepository.list(); }
  getByPedido(pedido_id: number) { return this.distribucionRepository.getByPedido(pedido_id); }
  create(data: Distribucion) { return this.distribucionRepository.create(data); }
  update(id: number, data: Partial<Distribucion>) { return this.distribucionRepository.update(id, data); }
}