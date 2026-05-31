import { Cliente } from './domain/cliente';

export interface ClienteRepository {
  list(): Promise<Cliente[]>;
  getById(id: number): Promise<Cliente | null>;
  create(data: Cliente): Promise<number>;
  update(id: number, data: Partial<Cliente>): Promise<void>;
  delete(id: number): Promise<void>;
}