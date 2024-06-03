import { Controller, Get, Post, Put, Delete, Param, Body, Request, Response, Res } from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { User } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly UserModuleService: UserModuleService) {}

  @Post()
  async createUser( @Body() userBody:User ) {
    
    let userCreated = await this.UserModuleService.createUser(userBody)
    return userCreated;
  }
}
