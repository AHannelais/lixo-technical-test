import { Module } from '@nestjs/common';
import { VacationController } from '../controllers/vacation.controller';
import { VacationService } from '../services/vacation.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VacationController],
  providers: [VacationService, PrismaService],
})
export class VacationModule {}
