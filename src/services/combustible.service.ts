import { CombustibleRepository } from './repositories/combustible.repository';
import { Combustible } from './repositories/domain/combustible';

export class CombustibleService {
  constructor(private combustibleRepository: CombustibleRepository) {}

  list() { return this.combustibleRepository.list(); }
  getByVehiculo(vehiculo_id: number) { return this.combustibleRepository.getByVehiculo(vehiculo_id); }
  create(data: Combustible) { return this.combustibleRepository.create(data); }
}