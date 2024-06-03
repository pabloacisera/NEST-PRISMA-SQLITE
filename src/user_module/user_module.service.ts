// user_module.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './interface/user.interface'; 

@Injectable()
export class UserModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<User> {
    const userFound = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userFound) {
      throw new NotFoundException({
        message: 'Usuario no encontrado',
      });
    }

    return userFound;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          area: data.area,
        },
      });
      return newUser;
    } catch (error) {
      // Manejo de errores
      throw new Error('Error al crear usuario');
    }
  }

  async updateUser(id: number, data: CreateUserDto): Promise<User> {
    try {
      const userUpdate = await this.prisma.user.update({
        where: { id: id },
        data: { ...data },
      });

      if (!userUpdate) {
        throw new NotFoundException({
          message: 'Usuario no encontrado para actualizar',
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
