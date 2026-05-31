import { ProductoRepository } from './repositories/producto.repository';
import { Producto } from './repositories/domain/producto';

export class ProductoService {
  constructor(private productoRepository: ProductoRepository) {}

  list() { return this.productoRepository.list(); }
  getById(id: number) { return this.productoRepository.getById(id); }
  create(data: Producto) { return this.productoRepository.create(data); }
  update(id: number, data: Partial<Producto>) { return this.productoRepository.update(id, data); }
  delete(id: number) { return this.productoRepository.delete(id); }
  updateStock(id: number, cantidad: number) { return this.productoRepository.updateStock(id, cantidad); }
}