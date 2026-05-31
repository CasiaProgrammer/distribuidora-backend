import { connector } from '../../../../common/persistence/persistence.mysql';
import { ViaticoRepository } from '../../viatico.repository';
import { Viatico } from '../../domain/viatico';

export class ViaticoRepositoryMySQL implements ViaticoRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM viaticos ORDER BY id DESC');
    return rows as Viatico[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM viaticos WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async getByUsuario(usuario_id: number) {
    const [rows] = await connector.query('SELECT * FROM viaticos WHERE usuario_id = ? ORDER BY id DESC', [usuario_id]);
    return rows as Viatico[];
  }

  async create(data: Viatico) {
    const [r]: any = await connector.query(
      'INSERT INTO viaticos (usuario_id, vehiculo_id, destino, motivo, monto, estado) VALUES (?,?,?,?,?,?)',
      [data.usuario_id, data.vehiculo_id ?? null, data.destino, data.motivo ?? null, data.monto, data.estado ?? 'pendiente']
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Viatico>) {
    await connector.query(
      'UPDATE viaticos SET estado=? WHERE id=?',
      [data.estado, id]
    );
  }
}