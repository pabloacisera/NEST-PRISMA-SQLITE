import { Controller, Get, Post, Put, Delete} from '@nestjs/common';
import { UserModuleService } from './user_module.service';

@Controller('')
export class UserController {
  constructor(private userModuleService: UserModuleService) {}

  @Get('/userId')
  getUserId() {
    return this.userModuleService.getUserId();
  }

  @Post()
  createUser(): string {
    // implement create user logic
    return 'User created successfully';
  }

  @Put()
  updateUser(): string {
    // implement update user logic
    return 'User updated successfully';
  }

  @Delete()
  deleteUser(): string {
    // implement delete user logic
    return 'User deleted successfully';
  }
}