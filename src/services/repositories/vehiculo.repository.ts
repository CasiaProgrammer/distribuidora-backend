import { Vehiculo } from './domain/vehiculo';

export interface VehiculoRepository {
  list(): Promise<Vehiculo[]>;
  getById(id: number): Promise<Vehiculo | null>;
  create(data: Vehiculo): Promise<number>;
  update(id: number, data: Partial<Vehiculo>): Promise<void>;
  delete(id: number): Promise<void>;
}