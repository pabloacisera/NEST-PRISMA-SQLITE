import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user_module/user.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from '../prisma/prisma.module'
import { CustomLogger } from './winston/logger.service';
import { morganMidlleware } from './morgan/morgan.middleware';

@Module({
  imports: [UserModule, ClientModule, PrismaModule],
  providers:[CustomLogger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(morganMidlleware)
    .forRoutes({path: "*", method: RequestMethod.ALL})
  }
}
