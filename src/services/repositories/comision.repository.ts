import { Comision } from './domain/comision';

export interface ComisionRepository {
  list(): Promise<Comision[]>;
  getByVendedor(vendedor_id: number): Promise<Comision[]>;
  getTotalByVendedor(vendedor_id: number): Promise<number>;
  create(data: Comision): Promise<number>;
}