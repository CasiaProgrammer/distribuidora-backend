import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { CombustibleService } from '../services/combustible.service';

@route('/combustible')
export class CombustibleController extends BaseController {
  constructor(private readonly combustibleService: CombustibleService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.combustibleService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const total = req.body.galones * req.body.precio_galon;
    const id = await this.combustibleService.create({ ...req.body, total });
    return this.created(res, { id, ...req.body, total });
  }
}

@route('/combustible/vehiculo/:id')
export class CombustibleVehiculoController extends BaseController {
  constructor(private readonly combustibleService: CombustibleService) { super(); }

  @GET()
  async getByVehiculo(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this.ok(res, await this.combustibleService.getByVehiculo(id));
  }
}