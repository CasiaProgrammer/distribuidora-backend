import { Categoria } from './domain/categoria';

export interface CategoriaRepository {
  list(): Promise<Categoria[]>;
  getById(id: number): Promise<Categoria | null>;
  create(data: Categoria): Promise<number>;
  update(id: number, data: Partial<Categoria>): Promise<void>;
  delete(id: number): Promise<void>;
}