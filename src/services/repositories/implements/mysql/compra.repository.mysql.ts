import { connector } from '../../../../common/persistence/persistence.mysql';
import { CompraRepository } from '../../compra.repository';
import { Compra, DetalleCompra } from '../../domain/compra';

export class CompraRepositoryMySQL implements CompraRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM compras ORDER BY id DESC');
    return rows as Compra[];
  }

  async create(data: Compra) {
    const [r]: any = await connector.query(
      'INSERT INTO compras (proveedor, total) VALUES (?,?)',
      [data.proveedor, data.total ?? 0]
    );
    return r.insertId;
  }

  async actualizarTotal(id: number, subtotal: number) {
    await connector.query('UPDATE compras SET total = total + ? WHERE id=?', [subtotal, id]);
  }

  async addDetalle(detalle: DetalleCompra) {
    const [r]: any = await connector.query(
      'INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)',
      [detalle.compra_id, detalle.producto_id, detalle.cantidad, detalle.precio_unitario]
    );
    return r.insertId;
  }

  async getDetalles(compra_id: number) {
    const [rows] = await connector.query('SELECT * FROM detalle_compras WHERE compra_id = ?', [compra_id]);
    return rows as DetalleCompra[];
  }
}