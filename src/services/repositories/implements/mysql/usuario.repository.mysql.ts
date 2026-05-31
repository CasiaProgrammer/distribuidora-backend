import { connector } from '../../../../common/persistence/persistence.mysql';
import { UsuarioRepository } from '../../usuario.repository';
import { Usuario } from '../../domain/usuario';
import bcrypt from 'bcryptjs';

export class UsuarioRepositoryMySQL implements UsuarioRepository {
  async list() {
    const [rows] = await connector.query('SELECT id, nombre, email, rol, activo FROM usuarios ORDER BY id ASC');
    return rows as Usuario[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT id, nombre, email, rol, activo FROM usuarios WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async getByEmail(email: string) {
    const [rows]: any = await connector.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] ?? null;
  }

  async create(data: Usuario) {
  const hash = await bcrypt.hash(data.password, 10);
  const [r]: any = await connector.query(
    'INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?,?,?,?,?)',
    [data.nombre, data.email, hash, data.rol, data.activo ?? true]
  );
  return r.insertId;
}

  async update(id: number, data: Partial<Usuario>) {
    if (data.password && data.password !== '') {
      await connector.query(
        'UPDATE usuarios SET nombre=?, email=?, rol=?, activo=?, password=? WHERE id=?',
        [data.nombre, data.email, data.rol, data.activo, data.password, id]
      );
    } else {
      await connector.query(
        'UPDATE usuarios SET nombre=?, email=?, rol=?, activo=? WHERE id=?',
        [data.nombre, data.email, data.rol, data.activo, id]
      );
    }
  }

  async delete(id: number) {
    await connector.query('DELETE FROM usuarios WHERE id=?', [id]);
  }
}