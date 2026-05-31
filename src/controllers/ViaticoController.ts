import { GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ViaticoService } from '../services/viatico.service';

@route('/viaticos')
export class ViaticoController extends BaseController {
  constructor(private readonly viaticoService: ViaticoService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.viaticoService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.viaticoService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.viaticoService.update(id, req.body);
    return this.ok(res);
  }
}