import { connector } from '../../../../common/persistence/persistence.mysql';
import { CombustibleRepository } from '../../combustible.repository';
import { Combustible } from '../../domain/combustible';

export class CombustibleRepositoryMySQL implements CombustibleRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM combustible ORDER BY id DESC');
    return rows as Combustible[];
  }

  async getByVehiculo(vehiculo_id: number) {
    const [rows] = await connector.query('SELECT * FROM combustible WHERE vehiculo_id = ? ORDER BY id DESC', [vehiculo_id]);
    return rows as Combustible[];
  }

  async create(data: Combustible) {
    const [r]: any = await connector.query(
      'INSERT INTO combustible (vehiculo_id, galones, precio_galon, total, km_recorridos, observaciones) VALUES (?,?,?,?,?,?)',
      [data.vehiculo_id, data.galones, data.precio_galon, data.total, data.km_recorridos ?? null, data.observaciones ?? null]
    );
    return r.insertId;
  }
}