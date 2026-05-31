import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { UsuarioService } from '../services/usuario.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

@route('/auth')
export class AuthController extends BaseController {
  constructor(private readonly usuarioService: UsuarioService) { super(); }

  @POST()
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const usuario = await this.usuarioService.getByEmail(email);
    if (!usuario) return this.ok(res, { error: 'Usuario no encontrado' });
    if (!usuario.activo) return this.ok(res, { error: 'Usuario inactivo' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return this.ok(res, { error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    return this.ok(res, { token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
  }
}