// client.module.ts
import { Module } from '@nestjs/common';
import { ClientModuleService } from './client.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ClientController } from './client.controller';

@Module({
  imports: [PrismaModule],
  controllers:[ClientController],
  providers: [ClientModuleService],
  exports: [ClientModuleService],
})
export class ClientModule {}
