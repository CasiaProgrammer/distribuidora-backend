import { Application } from 'express';
import { asClass, createContainer, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';

import { UsuarioService } from './services/usuario.service';
import { ProductoService } from './services/producto.service';
import { CategoriaService } from './services/categoria.service';
import { PedidoService } from './services/pedido.service';
import { CompraService } from './services/compra.service';
import { DistribucionService } from './services/distribucion.service';
import { ComisionService } from './services/comision.service';
import { PlanillaService } from './services/planilla.service';
import { ClienteService } from './services/cliente.service';
import { ProveedorService } from './services/proveedor.service';
import { VehiculoService } from './services/vehiculo.service';
import { CombustibleService } from './services/combustible.service';
import { ViaticoService } from './services/viatico.service';

import { UsuarioRepositoryMySQL } from './services/repositories/implements/mysql/usuario.repository.mysql';
import { ProductoRepositoryMySQL } from './services/repositories/implements/mysql/producto.repository.mysql';
import { CategoriaRepositoryMySQL } from './services/repositories/implements/mysql/categoria.repository.mysql';
import { PedidoRepositoryMySQL } from './services/repositories/implements/mysql/pedido.repository.mysql';
import { CompraRepositoryMySQL } from './services/repositories/implements/mysql/compra.repository.mysql';
import { DistribucionRepositoryMySQL } from './services/repositories/implements/mysql/distribucion.repository.mysql';
import { ComisionRepositoryMySQL } from './services/repositories/implements/mysql/comision.repository.mysql';
import { PlanillaRepositoryMySQL } from './services/repositories/implements/mysql/planilla.repository.mysql';
import { ClienteRepositoryMySQL } from './services/repositories/implements/mysql/cliente.repository.mysql';
import { ProveedorRepositoryMySQL } from './services/repositories/implements/mysql/proveedor.repository.mysql';
import { VehiculoRepositoryMySQL } from './services/repositories/implements/mysql/vehiculo.repository.mysql';
import { CombustibleRepositoryMySQL } from './services/repositories/implements/mysql/combustible.repository.mysql';
import { ViaticoRepositoryMySQL } from './services/repositories/implements/mysql/viatico.repository.mysql';

export default (app: Application) => {
  const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

  container.register({
    usuarioService: asClass(UsuarioService).scoped(),
    productoService: asClass(ProductoService).scoped(),
    categoriaService: asClass(CategoriaService).scoped(),
    pedidoService: asClass(PedidoService).scoped(),
    compraService: asClass(CompraService).scoped(),
    distribucionService: asClass(DistribucionService).scoped(),
    comisionService: asClass(ComisionService).scoped(),
    planillaService: asClass(PlanillaService).scoped(),
    clienteService: asClass(ClienteService).scoped(),
    proveedorService: asClass(ProveedorService).scoped(),
    vehiculoService: asClass(VehiculoService).scoped(),
    combustibleService: asClass(CombustibleService).scoped(),
    viaticoService: asClass(ViaticoService).scoped(),

    usuarioRepository: asClass(UsuarioRepositoryMySQL).scoped(),
    productoRepository: asClass(ProductoRepositoryMySQL).scoped(),
    categoriaRepository: asClass(CategoriaRepositoryMySQL).scoped(),
    pedidoRepository: asClass(PedidoRepositoryMySQL).scoped(),
    compraRepository: asClass(CompraRepositoryMySQL).scoped(),
    distribucionRepository: asClass(DistribucionRepositoryMySQL).scoped(),
    comisionRepository: asClass(ComisionRepositoryMySQL).scoped(),
    planillaRepository: asClass(PlanillaRepositoryMySQL).scoped(),
    clienteRepository: asClass(ClienteRepositoryMySQL).scoped(),
    proveedorRepository: asClass(ProveedorRepositoryMySQL).scoped(),
    vehiculoRepository: asClass(VehiculoRepositoryMySQL).scoped(),
    combustibleRepository: asClass(CombustibleRepositoryMySQL).scoped(),
    viaticoRepository: asClass(ViaticoRepositoryMySQL).scoped(),
  });

  app.use(scopePerRequest(container));
};