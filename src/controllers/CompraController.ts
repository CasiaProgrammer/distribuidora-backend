import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { CompraService } from '../services/compra.service';
import { ProductoService } from '../services/producto.service';

@route('/compras')
export class CompraController extends BaseController {
  constructor(
    private readonly compraService: CompraService,
    private readonly productoService: ProductoService
  ) { super(); }

  @GET()
  async list(_req: Request, res: Response) {
    return this.ok(res, await this.compraService.list());
  }

  @POST()
  async create(req: Request, res: Response) {
    const id = await this.compraService.create(req.body);
    return this.created(res, { id, ...req.body });
  }
}

@route('/compras/:id/detalle')
export class CompraDetalleController extends BaseController {
  constructor(
    private readonly compraService: CompraService,
    private readonly productoService: ProductoService
  ) { super(); }

  @GET()
  async getDetalles(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this.ok(res, await this.compraService.getDetalles(id));
  }

  @POST()
  async addDetalle(req: Request, res: Response) {
    const id = await this.compraService.addDetalle(req.body);
    await this.productoService.updateStock(req.body.producto_id, req.body.cantidad);

    const subtotal = req.body.cantidad * req.body.precio_unitario;
    await this.compraService.actualizarTotal(req.body.compra_id, subtotal);

    return this.created(res, { id, ...req.body });
  }
}

@route('/productos/sin-stock')
export class ProductoSinStockController extends BaseController {
  constructor(
    private readonly compraService: CompraService,
    private readonly productoService: ProductoService
  ) { super(); }

  @GET()
  async sinStock(_req: Request, res: Response) {
    const productos = await this.productoService.list();
    const sinStock = productos.filter((p: any) => p.stock <= 0);
    return this.ok(res, sinStock);
  }
}