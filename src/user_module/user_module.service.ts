// user_module.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './interface/user.interface';
import { loginUserDto } from './interface/loginUserDto';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserModuleService {
  constructor(private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

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
    const { password } = data;

    const hashGen = await hash(password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashGen,
          area: data.area,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error('Error al crear usuario');
    }
  }

  async updateUser(id: number, data: CreateUserDto): Promise<User> {
    if (data.password) {
      const hashedPassword = await hash(data.password, 10);
      data.password = hashedPassword;
    }
  
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

  async loginUser(dataLogin: loginUserDto) {
    try {
      const { email, password } = dataLogin;
  
      // Esperar a que se resuelva la promesa
      const userFound = await this.prisma.user.findUnique({
        where: { email: email },
      });
  
      if (!userFound) {
        throw new NotFoundException({ message: 'El correo electronico proporcionado no existe en base de datos' });
      }
  
      // Comparar la contraseña
      const isValidPassword = await bcrypt.compare(password, userFound.password);
  
      if (!isValidPassword) {
        throw new NotFoundException({ message: 'La contraseña proporcionada no es correcta' });
      }

      const payload = {
        id: userFound.id,
        name:userFound.name,
      }

      const token = await this.jwtService.sign(
        payload,
      )

      const data = {
        user: userFound,
        token: token
      }
      return data;
  
    } catch (error) {
      throw error; 
    }
  }

  async patchUser(id: number, data: Partial<CreateUserDto>): Promise<User> {
    if (data.password) {
      const hashedPassword = await hash(data.password, 10);
      data.password = hashedPassword;
    }
  
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
}
