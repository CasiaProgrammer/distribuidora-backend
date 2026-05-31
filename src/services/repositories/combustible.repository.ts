import { Combustible } from './domain/combustible';

export interface CombustibleRepository {
  list(): Promise<Combustible[]>;
  getByVehiculo(vehiculo_id: number): Promise<Combustible[]>;
  create(data: Combustible): Promise<number>;
}