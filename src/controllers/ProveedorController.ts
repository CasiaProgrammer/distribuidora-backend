import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ProveedorService } from '../services/proveedor.service';

@route('/proveedores')
export class ProveedorController extends BaseController {
  constructor(private readonly proveedorService: ProveedorService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.proveedorService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.proveedorService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.proveedorService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.proveedorService.delete(id);
    return this.noContent(res);
  }
}