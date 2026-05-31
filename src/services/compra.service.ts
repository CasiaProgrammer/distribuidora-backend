import { CompraRepository } from './repositories/compra.repository';
import { Compra, DetalleCompra } from './repositories/domain/compra';

export class CompraService {
  constructor(private compraRepository: CompraRepository) {}

  list() { return this.compraRepository.list(); }
  create(data: Compra) { return this.compraRepository.create(data); }
  actualizarTotal(id: number, subtotal: number) { return this.compraRepository.actualizarTotal(id, subtotal); }
  addDetalle(detalle: DetalleCompra) { return this.compraRepository.addDetalle(detalle); }
  getDetalles(compra_id: number) { return this.compraRepository.getDetalles(compra_id); }
}