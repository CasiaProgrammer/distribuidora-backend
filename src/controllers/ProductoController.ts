import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ProductoService } from '../services/producto.service';

@route('/productos')
export class ProductoController extends BaseController {
  constructor(private readonly productoService: ProductoService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.productoService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.productoService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.productoService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.productoService.delete(id);
    return this.noContent(res);
  }
}