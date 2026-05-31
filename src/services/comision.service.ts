import { ComisionRepository } from './repositories/comision.repository';
import { Comision } from './repositories/domain/comision';

export class ComisionService {
  constructor(private comisionRepository: ComisionRepository) {}

  list() { return this.comisionRepository.list(); }
  getByVendedor(vendedor_id: number) { return this.comisionRepository.getByVendedor(vendedor_id); }
  getTotalByVendedor(vendedor_id: number) { return this.comisionRepository.getTotalByVendedor(vendedor_id); }
  create(data: Comision) { return this.comisionRepository.create(data); }

  calcularMonto(total: number, porcentaje: number) {
    return (total * porcentaje) / 100;
  }
}