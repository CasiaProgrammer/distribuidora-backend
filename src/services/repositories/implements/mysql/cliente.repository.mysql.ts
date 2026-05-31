import { connector } from '../../../../common/persistence/persistence.mysql';
import { ClienteRepository } from '../../cliente.repository';
import { Cliente } from '../../domain/cliente';

export class ClienteRepositoryMySQL implements ClienteRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM clientes ORDER BY id ASC');
    return rows as Cliente[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Cliente) {
    const [r]: any = await connector.query(
      'INSERT INTO clientes (nombre, email, telefono, direccion, nit, activo) VALUES (?,?,?,?,?,?)',
      [data.nombre, data.email ?? null, data.telefono ?? null, data.direccion ?? null, data.nit ?? null, data.activo ?? true]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Cliente>) {
    await connector.query(
      'UPDATE clientes SET nombre=?, email=?, telefono=?, direccion=?, nit=?, activo=? WHERE id=?',
      [data.nombre, data.email ?? null, data.telefono ?? null, data.direccion ?? null, data.nit ?? null, data.activo, id]
    );
  }

  async delete(id: number) {
    await connector.query('DELETE FROM clientes WHERE id=?', [id]);
  }
}