import { ClienteRepository } from './repositories/cliente.repository';
import { Cliente } from './repositories/domain/cliente';

export class ClienteService {
  constructor(private clienteRepository: ClienteRepository) {}

  list() { return this.clienteRepository.list(); }
  getById(id: number) { return this.clienteRepository.getById(id); }
  create(data: Cliente) { return this.clienteRepository.create(data); }
  update(id: number, data: Partial<Cliente>) { return this.clienteRepository.update(id, data); }
  delete(id: number) { return this.clienteRepository.delete(id); }
}