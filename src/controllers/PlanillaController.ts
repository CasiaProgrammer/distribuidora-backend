import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { PlanillaService } from '../services/planilla.service';
import { ComisionService } from '../services/comision.service';

@route('/planillas')
export class PlanillaController extends BaseController {
  constructor(
    private readonly planillaService: PlanillaService,
    private readonly comisionService: ComisionService
  ) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.planillaService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.planillaService.create(req.body);
    return this.created(res, { id, ...req.body });
  }
}

@route('/planillas/:id/detalle')
export class PlanillaDetalleController extends BaseController {
  constructor(
    private readonly planillaService: PlanillaService,
    private readonly comisionService: ComisionService
  ) { super(); }

  @GET()
  async getDetalles(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this.ok(res, await this.planillaService.getDetalles(id));
  }

  @POST()
  async addDetalle(req: Request, res: Response) {
    const comisiones = await this.comisionService.getTotalByVendedor(req.body.vendedor_id);
    const detalle = { ...req.body, comisiones };
    const id = await this.planillaService.addDetalle(detalle);

    const total = Number(req.body.salario_base) + Number(comisiones);
    await this.planillaService.actualizarTotal(req.body.planilla_id, total);

    return this.created(res, { id, ...detalle });
  }
}