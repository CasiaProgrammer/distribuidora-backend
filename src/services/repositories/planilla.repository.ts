import { Planilla, DetallePlanilla } from './domain/planilla';

export interface PlanillaRepository {
  list(): Promise<Planilla[]>;
  getById(id: number): Promise<Planilla | null>;
  create(data: Planilla): Promise<number>;
  actualizarTotal(id: number, total: number): Promise<void>;
  addDetalle(detalle: DetallePlanilla): Promise<number>;
  getDetalles(planilla_id: number): Promise<DetallePlanilla[]>;
}