// user.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { CreateUserDto } from './interface/user.interface';
import { loginUserDto } from './interface/loginUserDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userModuleService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() loginUserDto: loginUserDto) {
    return this.userModuleService.loginUser(loginUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userModuleService.getUserById(Number(id));
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async patchUserById(
    @Param('id') id: string,
    @Body() patchUserDto: Partial<CreateUserDto>,
  ) {
    return this.userModuleService.patchUser(Number(id), patchUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userModuleService.deleteUser(Number(id));
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.userModuleService.updateUser(Number(id), updateUserDto);
  }
}
