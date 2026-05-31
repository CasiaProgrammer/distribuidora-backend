import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ClienteService } from '../services/cliente.service';

@route('/clientes')
export class ClienteController extends BaseController {
  constructor(private readonly clienteService: ClienteService) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.clienteService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.clienteService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.clienteService.update(id, req.body);
    return this.ok(res);
  }

  @DELETE()
  async delete(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.clienteService.delete(id);
    return this.noContent(res);
  }
}