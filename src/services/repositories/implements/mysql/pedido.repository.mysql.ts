import { connector } from '../../../../common/persistence/persistence.mysql';
import { PedidoRepository } from '../../pedido.repository';
import { Pedido, DetallePedido } from '../../domain/pedido';

export class PedidoRepositoryMySQL implements PedidoRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM pedidos ORDER BY id DESC');
    return rows as Pedido[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async getByVendedor(vendedor_id: number) {
    const [rows] = await connector.query('SELECT * FROM pedidos WHERE vendedor_id = ? ORDER BY id DESC', [vendedor_id]);
    return rows as Pedido[];
  }

  async create(data: Pedido) {
    const [r]: any = await connector.query(
      'INSERT INTO pedidos (vendedor_id, estado, total) VALUES (?,?,?)',
      [data.vendedor_id, data.estado ?? 'pendiente', data.total ?? 0]
    );
    return r.insertId;
  }

  async updateEstado(id: number, estado: string) {
    await connector.query('UPDATE pedidos SET estado=? WHERE id=?', [estado, id]);
  }

  async actualizarTotal(id: number, subtotal: number) {
    await connector.query('UPDATE pedidos SET total = total + ? WHERE id=?', [subtotal, id]);
  }

  async addDetalle(detalle: DetallePedido) {
    const [r]: any = await connector.query(
      'INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)',
      [detalle.pedido_id, detalle.producto_id, detalle.cantidad, detalle.precio_unitario]
    );
    return r.insertId;
  }

  async getDetalles(pedido_id: number) {
    const [rows] = await connector.query('SELECT * FROM detalle_pedidos WHERE pedido_id = ?', [pedido_id]);
    return rows as DetallePedido[];
  }
}