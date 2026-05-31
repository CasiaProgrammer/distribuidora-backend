import { Usuario } from './domain/usuario';

export interface UsuarioRepository {
  list(): Promise<Usuario[]>;
  getById(id: number): Promise<Usuario | null>;
  getByEmail(email: string): Promise<Usuario | null>;
  create(data: Usuario): Promise<number>;
  update(id: number, data: Partial<Usuario>): Promise<void>;
  delete(id: number): Promise<void>;
}