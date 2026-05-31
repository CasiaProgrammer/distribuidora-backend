import { ProveedorRepository } from './repositories/proveedor.repository';
import { Proveedor } from './repositories/domain/proveedor';

export class ProveedorService {
  constructor(private proveedorRepository: ProveedorRepository) {}

  list() { return this.proveedorRepository.list(); }
  getById(id: number) { return this.proveedorRepository.getById(id); }
  create(data: Proveedor) { return this.proveedorRepository.create(data); }
  update(id: number, data: Partial<Proveedor>) { return this.proveedorRepository.update(id, data); }
  delete(id: number) { return this.proveedorRepository.delete(id); }
}