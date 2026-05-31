import { connector } from '../../../../common/persistence/persistence.mysql';
import { ProveedorRepository } from '../../proveedor.repository';
import { Proveedor } from '../../domain/proveedor';

export class ProveedorRepositoryMySQL implements ProveedorRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM proveedores ORDER BY id ASC');
    return rows as Proveedor[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM proveedores WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Proveedor) {
    const [r]: any = await connector.query(
      'INSERT INTO proveedores (nombre, email, telefono, direccion, nit, activo) VALUES (?,?,?,?,?,?)',
      [data.nombre, data.email ?? null, data.telefono ?? null, data.direccion ?? null, data.nit ?? null, data.activo ?? true]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Proveedor>) {
    await connector.query(
      'UPDATE proveedores SET nombre=?, email=?, telefono=?, direccion=?, nit=?, activo=? WHERE id=?',
      [data.nombre, data.email ?? null, data.telefono ?? null, data.direccion ?? null, data.nit ?? null, data.activo, id]
    );
  }

  async delete(id: number) {
    await connector.query('DELETE FROM proveedores WHERE id=?', [id]);
  }
}