import { VehiculoRepository } from './repositories/vehiculo.repository';
import { Vehiculo } from './repositories/domain/vehiculo';

export class VehiculoService {
  constructor(private vehiculoRepository: VehiculoRepository) {}

  list() { return this.vehiculoRepository.list(); }
  getById(id: number) { return this.vehiculoRepository.getById(id); }
  create(data: Vehiculo) { return this.vehiculoRepository.create(data); }
  update(id: number, data: Partial<Vehiculo>) { return this.vehiculoRepository.update(id, data); }
  delete(id: number) { return this.vehiculoRepository.delete(id); }
}