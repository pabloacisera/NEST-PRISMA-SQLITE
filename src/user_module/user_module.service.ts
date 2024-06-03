import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<User> {
    const userFound = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userFound) {
      throw new NotFoundException({
        message: 'usuario no encontrado',
      });
    }

    return userFound;
  }

  async createUser(data: User): Promise<User> {
    const newUser = await this.prisma.user.create({ data });
    return newUser;
  }

  async updateUser(id: number, data: User): Promise<User> {
    try {
      const userUpdate = await this.prisma.user.update({
        where: { id: id },
        data: data,
      });

      if (!userUpdate) {
        throw new NotFoundException({
          message: 'usuario no encontrado para actualizar',
        });
      }

      return userUpdate;
    } catch (error) {
      throw new NotFoundException({
        message: 'Error actualizando el usuario',
      });
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const userFound = await this.prisma.user.delete({
        where: { id: id },
      });

      return userFound;
    } catch (error) {
      throw new NotFoundException({
        message: 'No se ha podido eliminar el usuario',
      });
    }
  }
}
