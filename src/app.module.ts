import { Module } from '@nestjs/common';
import { userModule } from './user_module/user.module';
import { ClientModule } from './client/client.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [userModule, ClientModule, AuthenticationModule],
})
export class AppModule {}
