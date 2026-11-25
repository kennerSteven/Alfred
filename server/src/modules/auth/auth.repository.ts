import prisma from '../../config/prisma.js';
import { RegisterInput } from './auth.schemas.js';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        badgeNumber: true,
        unit: true,
        createdAt: true,
      },
    });
  }

  async createUser(data: RegisterInput & { passwordHash: string }) {
    const { password, ...userData } = data as any;
    return prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        badgeNumber: true,
        unit: true,
        createdAt: true,
      },
    });
  }
}

export default new AuthRepository();
