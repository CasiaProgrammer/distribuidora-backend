import { UsuarioRepository } from './repositories/usuario.repository';
import { Usuario } from './repositories/domain/usuario';

export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  list() { return this.usuarioRepository.list(); }
  getById(id: number) { return this.usuarioRepository.getById(id); }
  getByEmail(email: string) { return this.usuarioRepository.getByEmail(email); }
  create(data: Usuario) { return this.usuarioRepository.create(data); }
  update(id: number, data: Partial<Usuario>) { return this.usuarioRepository.update(id, data); }
  delete(id: number) { return this.usuarioRepository.delete(id); }
}