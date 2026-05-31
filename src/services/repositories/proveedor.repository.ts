import { Proveedor } from './domain/proveedor';

export interface ProveedorRepository {
  list(): Promise<Proveedor[]>;
  getById(id: number): Promise<Proveedor | null>;
  create(data: Proveedor): Promise<number>;
  update(id: number, data: Partial<Proveedor>): Promise<void>;
  delete(id: number): Promise<void>;
}