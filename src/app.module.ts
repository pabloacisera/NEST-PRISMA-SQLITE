import { Module } from '@nestjs/common';
import { userModule } from './user_module/user.module';
import { ClientModule } from './client/client.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [userModule, ClientModule, AuthenticationModule, PrismaModule],
})
export class AppModule {}
