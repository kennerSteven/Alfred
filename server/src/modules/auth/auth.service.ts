import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from './auth.repository.js';
import { LoginInput, RegisterInput } from './auth.schemas.js';
import { ApiError } from '../../utils/api-error.js';

export interface TokenPayload {
  id: string;
  email: string;
  fullName: string;
  role: 'INVESTIGADOR' | 'FISCAL';
  badgeNumber: string;
  unit: string;
}

export class AuthService {
  private getJwtSecret(): string {
    return process.env.JWT_SECRET || 'alfred-sic-jwt-secret-key-2026';
  }

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.getJwtSecret(), {
      expiresIn: '8h',
    });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.getJwtSecret()) as TokenPayload;
    } catch {
      throw ApiError.unauthorized('Token inválido o expirado');
    }
  }

  async login(input: LoginInput) {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized('Credenciales incorrectas');
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw ApiError.unauthorized('Credenciales incorrectas');
    }

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'INVESTIGADOR' | 'FISCAL',
      badgeNumber: user.badgeNumber,
      unit: user.unit,
    };

    const token = this.generateToken(payload);

    return {
      token,
      user: payload,
    };
  }

  async register(input: RegisterInput) {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw ApiError.conflict('El correo institucional ya se encuentra registrado');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await authRepository.createUser({
      ...input,
      passwordHash,
    });

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'INVESTIGADOR' | 'FISCAL',
      badgeNumber: user.badgeNumber,
      unit: user.unit,
    };

    const token = this.generateToken(payload);

    return {
      token,
      user: payload,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('Usuario no encontrado');
    }
    return user;
  }
}

export default new AuthService();
