import { ViaticoRepository } from './repositories/viatico.repository';
import { Viatico } from './repositories/domain/viatico';

export class ViaticoService {
  constructor(private viaticoRepository: ViaticoRepository) {}

  list() { return this.viaticoRepository.list(); }
  getById(id: number) { return this.viaticoRepository.getById(id); }
  getByUsuario(usuario_id: number) { return this.viaticoRepository.getByUsuario(usuario_id); }
  create(data: Viatico) { return this.viaticoRepository.create(data); }
  update(id: number, data: Partial<Viatico>) { return this.viaticoRepository.update(id, data); }
}