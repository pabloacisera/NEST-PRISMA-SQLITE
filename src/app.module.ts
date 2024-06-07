import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user_module/user.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from '../prisma/prisma.module'
import { LoggerMorganWinstonMiddleware } from './user_module/logger-morgan-winston/logger-morgan-winston.middleware';
import { CustomLogger } from './user_module/logger-morgan-winston/CustomLogger';

@Module({
  imports: [UserModule, ClientModule, PrismaModule],
  providers:[CustomLogger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMorganWinstonMiddleware)
    .forRoutes({path: "*", method: RequestMethod.ALL})
  }
}
