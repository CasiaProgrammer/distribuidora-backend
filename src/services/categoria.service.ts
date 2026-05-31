import { CategoriaRepository } from './repositories/categoria.repository';
import { Categoria } from './repositories/domain/categoria';

export class CategoriaService {
  constructor(private categoriaRepository: CategoriaRepository) {}

  list() { return this.categoriaRepository.list(); }
  getById(id: number) { return this.categoriaRepository.getById(id); }
  create(data: Categoria) { return this.categoriaRepository.create(data); }
  update(id: number, data: Partial<Categoria>) { return this.categoriaRepository.update(id, data); }
  delete(id: number) { return this.categoriaRepository.delete(id); }
}