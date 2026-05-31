import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { UsuarioService } from '../services/usuario.service';

@route('/usuarios')
export class UsuarioController extends BaseController {
  constructor(private readonly usuarioService: UsuarioService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.usuarioService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.usuarioService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.usuarioService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.usuarioService.delete(id);
    return this.noContent(res);
  }
}