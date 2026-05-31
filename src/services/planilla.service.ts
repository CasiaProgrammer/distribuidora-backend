import { PlanillaRepository } from './repositories/planilla.repository';
import { Planilla, DetallePlanilla } from './repositories/domain/planilla';

export class PlanillaService {
  constructor(private planillaRepository: PlanillaRepository) {}

  list() { return this.planillaRepository.list(); }
  getById(id: number) { return this.planillaRepository.getById(id); }
  create(data: Planilla) { return this.planillaRepository.create(data); }
  actualizarTotal(id: number, total: number) { return this.planillaRepository.actualizarTotal(id, total); }
  addDetalle(detalle: DetallePlanilla) { return this.planillaRepository.addDetalle(detalle); }
  getDetalles(planilla_id: number) { return this.planillaRepository.getDetalles(planilla_id); }
}