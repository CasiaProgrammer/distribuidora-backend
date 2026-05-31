import { GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';

@route('/pedidos')
export class PedidoController extends BaseController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly productoService: ProductoService
  ) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.pedidoService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.pedidoService.create(req.body);
    return this.created(res, { id, ...req.body });
  }

  @PUT()
  async updateEstado(req: Request, res: Response) {
    const id = Number(req.query.id);
    await this.pedidoService.updateEstado(id, req.body.estado);
    return this.ok(res);
  }
}

@route('/pedidos/:id/detalle')
export class PedidoDetalleController extends BaseController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly productoService: ProductoService
  ) { super(); }

  @GET()
  async getDetalles(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this.ok(res, await this.pedidoService.getDetalles(id));
  }

  @POST()
  async addDetalle(req: Request, res: Response) {
    const producto = await this.productoService.getById(req.body.producto_id);
    if (!producto) return this.ok(res, { error: 'Producto no encontrado' });
    if (producto.stock < req.body.cantidad) return this.ok(res, { error: 'Stock insuficiente' });

    const id = await this.pedidoService.addDetalle(req.body);
    await this.productoService.updateStock(req.body.producto_id, -req.body.cantidad);

    const subtotal = req.body.cantidad * req.body.precio_unitario;
    await this.pedidoService.actualizarTotal(req.body.pedido_id, subtotal);

    return this.created(res, { id, ...req.body });
  }
}