import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { CategoriaService } from '../services/categoria.service';

@route('/categorias')
export class CategoriaController extends BaseController {
  constructor(private readonly categoriaService: CategoriaService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.categoriaService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.categoriaService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.categoriaService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.categoriaService.delete(id);
    return this.noContent(res);
  }
}