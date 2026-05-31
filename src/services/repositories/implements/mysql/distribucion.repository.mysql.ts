import { connector } from '../../../../common/persistence/persistence.mysql';
import { DistribucionRepository } from '../../distribucion.repository';
import { Distribucion } from '../../domain/distribucion';

export class DistribucionRepositoryMySQL implements DistribucionRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM distribuciones ORDER BY id DESC');
    return rows as Distribucion[];
  }

  async getByPedido(pedido_id: number) {
    const [rows]: any = await connector.query('SELECT * FROM distribuciones WHERE pedido_id = ?', [pedido_id]);
    return rows[0] ?? null;
  }

  async create(data: Distribucion) {
    const [r]: any = await connector.query(
      'INSERT INTO distribuciones (pedido_id, estado, observaciones) VALUES (?,?,?)',
      [data.pedido_id, data.estado ?? 'incompleto', data.observaciones ?? null]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Distribucion>) {
    await connector.query(
      'UPDATE distribuciones SET estado=?, observaciones=? WHERE id=?',
      [data.estado, data.observaciones ?? null, id]
    );
  }
}