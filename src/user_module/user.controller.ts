import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post()
  async createUser(@Body() data: User) {
    return this.userModuleService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) { // @Param('id') para obtener el parámetro id correctamente
    return this.userModuleService.getUserById(Number(id)); // Number(id) transforma el str en number
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) { // @Param('id') para obtener el parámetro id correctamente
    return this.userModuleService.deleteUser(Number(id));
  }

  @Put(':id')
  async updateUserById(@Param('id') id: string, @Body() data: User) { // @Param('id') para obtener el parámetro id correctamente
    return this.userModuleService.updateUser(Number(id), data);
  }
}
