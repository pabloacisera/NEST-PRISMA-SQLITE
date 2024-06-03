import { Module } from '@nestjs/common';
import { UserController } from './user.controller'
import { UserModuleService } from './user_module.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({ controllers: [UserController], providers: [UserModuleService], imports:[PrismaModule]})
export class userModule {}