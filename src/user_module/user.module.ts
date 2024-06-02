import { Module } from '@nestjs/common';
import { UserController } from './user.controller'
import { UserModuleService } from './user_module.service';

@Module({ controllers: [UserController], providers: [UserModuleService] })
export class userModule {}