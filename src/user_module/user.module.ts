import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModuleService } from './user_module.service';
import { PrismaModule } from 'prisma/prisma.module'; // Verifica esta ruta
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserModuleService, JwtStrategy],
})
export class UserModule {}
