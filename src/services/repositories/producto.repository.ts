import { Producto } from './domain/producto';

export interface ProductoRepository {
  list(): Promise<Producto[]>;
  getById(id: number): Promise<Producto | null>;
  create(data: Producto): Promise<number>;
  update(id: number, data: Partial<Producto>): Promise<void>;
  delete(id: number): Promise<void>;
  updateStock(id: number, cantidad: number): Promise<void>;
}