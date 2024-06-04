// user.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { CreateUserDto } from './interface/user.interface'; // Importar el DTO
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async createUser(@Body() createUserDto: CreateUserDto) { 
    return this.userModuleService.createUser(createUserDto); 
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userModuleService.getUserById(Number(id));
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userModuleService.deleteUser(Number(id));
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true })) 
  async updateUserById(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) { 
    return this.userModuleService.updateUser(Number(id), updateUserDto); 
  }
}
