import { Viatico } from './domain/viatico';

export interface ViaticoRepository {
  list(): Promise<Viatico[]>;
  getById(id: number): Promise<Viatico | null>;
  getByUsuario(usuario_id: number): Promise<Viatico[]>;
  create(data: Viatico): Promise<number>;
  update(id: number, data: Partial<Viatico>): Promise<void>;
}