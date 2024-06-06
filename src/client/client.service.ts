import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClientDto } from './clientInterface/client.dto';

@Injectable()
export class ClientModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllClients(): Promise<Client[]> {
    try {
      return await this.prisma.client.findMany();
    } catch (error) {
      throw new NotFoundException('Error al obtener clientes');
    }
  }

  async getClientById(id: number): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException({
        message: 'Cliente no encontrado',
      });
    }

    return client;
  }

  async createClient(data: CreateClientDto): Promise<Client> {
    try {
      const newClient = await this.prisma.client.create({
        data: {
          ...data,
          fechaNacimiento: new Date(data.fechaNacimiento) // Asegurarse de que la fecha esté en el formato correcto
        },
      });
      return newClient;
    } catch (error) {
      throw new Error('Error al crear cliente');
    }
  }

  async updateClient(id: number, data: CreateClientDto): Promise<Client> {
    try {
      const clientUpdate = await this.prisma.client.update({
        where: { id },
        data: {
          ...data,
          fechaNacimiento: new Date(data.fechaNacimiento) // Asegurarse de que la fecha esté en el formato correcto
        },
      });

      if (!clientUpdate) {
        throw new NotFoundException({
          message: 'Cliente no encontrado para actualizar',
        });
      }

      return clientUpdate;
    } catch (error) {
      throw new NotFoundException({
        message: 'Error actualizando el cliente',
      });
    }
  }

  async deleteClient(id: number): Promise<Client> {
    try {
      const client = await this.prisma.client.delete({
        where: { id },
      });

      return client;
    } catch (error) {
      throw new NotFoundException({
        message: 'No se ha podido eliminar el cliente',
      });
    }
  }

  async patchClient(id: number, data: Partial<CreateClientDto>): Promise<Client> {
    try {
      const clientUpdate = await this.prisma.client.update({
        where: { id },
        data: {
          ...data,
          fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : undefined // Asegurarse de que la fecha esté en el formato correcto
        },
      });

      if (!clientUpdate) {
        throw new NotFoundException({
          message: 'Cliente no encontrado para actualizar',
        });
      }

      return clientUpdate;
    } catch (error) {
      throw new NotFoundException({
        message: 'Error actualizando el cliente',
      });
    }
  }
}
