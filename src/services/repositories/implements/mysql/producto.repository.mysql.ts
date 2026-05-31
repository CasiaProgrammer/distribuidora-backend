import { connector } from '../../../../common/persistence/persistence.mysql';
import { ProductoRepository } from '../../producto.repository';
import { Producto } from '../../domain/producto';

export class ProductoRepositoryMySQL implements ProductoRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM productos ORDER BY id ASC');
    return rows as Producto[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Producto) {
    const [r]: any = await connector.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?,?,?,?,?)',
      [data.nombre, data.descripcion ?? null, data.precio, data.stock, data.categoria_id]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Producto>) {
    await connector.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria_id=? WHERE id=?',
      [data.nombre, data.descripcion ?? null, data.precio, data.stock, data.categoria_id, id]
    );
  }

  async delete(id: number) {
    await connector.query('DELETE FROM productos WHERE id=?', [id]);
  }

  async updateStock(id: number, cantidad: number) {
    await connector.query('UPDATE productos SET stock = stock + ? WHERE id=?', [cantidad, id]);
  }
}