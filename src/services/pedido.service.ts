import { PedidoRepository } from './repositories/pedido.repository';
import { Pedido, DetallePedido } from './repositories/domain/pedido';

export class PedidoService {
  constructor(private pedidoRepository: PedidoRepository) {}

  list() { return this.pedidoRepository.list(); }
  getById(id: number) { return this.pedidoRepository.getById(id); }
  getByVendedor(vendedor_id: number) { return this.pedidoRepository.getByVendedor(vendedor_id); }
  create(data: Pedido) { return this.pedidoRepository.create(data); }
  updateEstado(id: number, estado: string) { return this.pedidoRepository.updateEstado(id, estado); }
  actualizarTotal(id: number, subtotal: number) { return this.pedidoRepository.actualizarTotal(id, subtotal); }
  addDetalle(detalle: DetallePedido) { return this.pedidoRepository.addDetalle(detalle); }
  getDetalles(pedido_id: number) { return this.pedidoRepository.getDetalles(pedido_id); }
}