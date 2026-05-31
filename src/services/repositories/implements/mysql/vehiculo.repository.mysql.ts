import { connector } from '../../../../common/persistence/persistence.mysql';
import { VehiculoRepository } from '../../vehiculo.repository';
import { Vehiculo } from '../../domain/vehiculo';

export class VehiculoRepositoryMySQL implements VehiculoRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM vehiculos ORDER BY id ASC');
    return rows as Vehiculo[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM vehiculos WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Vehiculo) {
    const [r]: any = await connector.query(
      'INSERT INTO vehiculos (placa, marca, modelo, anio, tipo_combustible, rendimiento, activo) VALUES (?,?,?,?,?,?,?)',
      [data.placa, data.marca, data.modelo, data.anio ?? null, data.tipo_combustible, data.rendimiento, data.activo ?? true]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Vehiculo>) {
    await connector.query(
      'UPDATE vehiculos SET placa=?, marca=?, modelo=?, anio=?, tipo_combustible=?, rendimiento=?, activo=? WHERE id=?',
      [data.placa, data.marca, data.modelo, data.anio ?? null, data.tipo_combustible, data.rendimiento, data.activo, id]
    );
  }

  async delete(id: number) {
    await connector.query('DELETE FROM vehiculos WHERE id=?', [id]);
  }
}