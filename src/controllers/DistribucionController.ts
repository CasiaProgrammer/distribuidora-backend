import { GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { DistribucionService } from '../services/distribucion.service';
import { PedidoService } from '../services/pedido.service';

@route('/distribuciones')
export class DistribucionController extends BaseController {
  constructor(
    private readonly distribucionService: DistribucionService,
    private readonly pedidoService: PedidoService
  ) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.distribucionService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const existente = await this.distribucionService.getByPedido(req.body.pedido_id);
    if (existente) return this.ok(res, { error: 'Este pedido ya tiene una distribución registrada' });

    const detalles = await this.pedidoService.getDetalles(req.body.pedido_id);
    const estado = detalles.length > 0 ? 'completo' : 'incompleto';

    const id = await this.distribucionService.create({ ...req.body, estado });
    await this.pedidoService.updateEstado(req.body.pedido_id, 'entregado');
    return this.created(res, { id, estado });
  }

  @PUT()
  async update(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.distribucionService.update(id, req.body);
    return this.ok(res);
  }
}