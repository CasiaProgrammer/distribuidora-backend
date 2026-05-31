import { connector } from '../../../../common/persistence/persistence.mysql';
import { PlanillaRepository } from '../../planilla.repository';
import { Planilla, DetallePlanilla } from '../../domain/planilla';

export class PlanillaRepositoryMySQL implements PlanillaRepository {
  async list() {
    const [rows] = await connector.query('SELECT * FROM planillas ORDER BY id DESC');
    return rows as Planilla[];
  }

  async getById(id: number) {
    const [rows]: any = await connector.query('SELECT * FROM planillas WHERE id = ?', [id]);
    return rows[0] ?? null;
  }

  async create(data: Planilla) {
    const [r]: any = await connector.query(
      'INSERT INTO planillas (periodo, total) VALUES (?,?)',
      [data.periodo, data.total ?? 0]
    );
    return r.insertId;
  }

  async actualizarTotal(id: number, total: number) {
    await connector.query('UPDATE planillas SET total = total + ? WHERE id=?', [total, id]);
  }

  async addDetalle(detalle: DetallePlanilla) {
    const total = detalle.salario_base + (detalle.comisiones ?? 0);
    const [r]: any = await connector.query(
      'INSERT INTO detalle_planillas (planilla_id, vendedor_id, salario_base, comisiones, total) VALUES (?,?,?,?,?)',
      [detalle.planilla_id, detalle.vendedor_id, detalle.salario_base, detalle.comisiones ?? 0, total]
    );
    return r.insertId;
  }

  async getDetalles(planilla_id: number) {
    const [rows] = await connector.query('SELECT * FROM detalle_planillas WHERE planilla_id = ?', [planilla_id]);
    return rows as DetallePlanilla[];
  }
}