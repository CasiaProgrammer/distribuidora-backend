import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { VehiculoService } from '../services/vehiculo.service';

@route('/vehiculos')
export class VehiculoController extends BaseController {
  constructor(private readonly vehiculoService: VehiculoService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.vehiculoService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.vehiculoService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.vehiculoService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.vehiculoService.delete(id);
    return this.noContent(res);
  }
}