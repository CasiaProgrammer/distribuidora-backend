import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ComisionService } from '../services/comision.service';
import { PedidoService } from '../services/pedido.service';

@route('/comisiones')
export class ComisionController extends BaseController {
  constructor(
    private readonly comisionService: ComisionService,
    private readonly pedidoService: PedidoService
  ) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.comisionService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const { vendedor_id, pedido_id, porcentaje } = req.body;
    const pedido: any = await this.pedidoService.getById(pedido_id);
    if (!pedido) return this.ok(res, { error: 'Pedido no encontrado' });

    const monto = this.comisionService.calcularMonto(pedido.total, porcentaje);
    const id = await this.comisionService.create({ vendedor_id, pedido_id, monto, porcentaje });
    return this.created(res, { id, monto });
  }
}

@route('/comisiones/vendedor/:id')
export class ComisionVendedorController extends BaseController {
  constructor(
    private readonly comisionService: ComisionService,
    private readonly pedidoService: PedidoService
  ) { super(); }

  @GET()
  async getByVendedor(req: Request, res: Response) {
    const id = Number(req.params.id);
    const comisiones = await this.comisionService.getByVendedor(id);
    const total = await this.comisionService.getTotalByVendedor(id);
    return this.ok(res, { comisiones, total });
  }
}