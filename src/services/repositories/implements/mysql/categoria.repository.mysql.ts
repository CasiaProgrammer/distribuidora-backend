import { connector } from '../../../../common/persistence/persistence.mysql';
import { CategoriaRepository } from '../../categoria.repository';
import { Categoria } from '../../domain/categoria';

export class CategoriaRepositoryMySQL implements CategoriaRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM categorias ORDER BY id ASC');
    return rows as Categoria[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Categoria) {
    const [r]: any = await connector.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?,?)',
      [data.nombre, data.descripcion ?? null]
    );
    return r.insertId;
  }

  async update(id: number, data: Partial<Categoria>) {
    await connector.query(
      'UPDATE categorias SET nombre=?, descripcion=? WHERE id=?',
      [data.nombre, data.descripcion ?? null, id]
    );
  }

  async delete(id: number) {
    await connector.query('DELETE FROM categorias WHERE id=?', [id]);
  }
}