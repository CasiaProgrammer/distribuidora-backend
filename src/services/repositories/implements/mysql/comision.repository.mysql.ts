import { connector } from '../../../../common/persistence/persistence.mysql';
import { ComisionRepository } from '../../comision.repository';
import { Comision } from '../../domain/comision';

export class ComisionRepositoryMySQL implements ComisionRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM comisiones ORDER BY id DESC');
    return rows as Comision[];
  }

  async getByVendedor(vendedor_id: number) {
    const [rows] = await connector.query('SELECT * FROM comisiones WHERE vendedor_id = ? ORDER BY id DESC', [vendedor_id]);
    return rows as Comision[];
  }

  async getTotalByVendedor(vendedor_id: number) {
    const [rows]: any = await connector.query('SELECT SUM(monto) as total FROM comisiones WHERE vendedor_id = ?', [vendedor_id]);
    return rows[0].total ?? 0;
  }

  async create(data: Comision) {
    const [r]: any = await connector.query(
      'INSERT INTO comisiones (vendedor_id, pedido_id, monto, porcentaje) VALUES (?,?,?,?)',
      [data.vendedor_id, data.pedido_id, data.monto, data.porcentaje]
    );
    return r.insertId;
  }
}