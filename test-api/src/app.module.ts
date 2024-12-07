import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VacationModule } from './modules/vacation.module';
import { EmployeeModule } from './modules/employee.module';

import { EmployeeService } from './services/employee.service';
import { VacationService } from './services/vacation.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, EmployeeModule, VacationModule],
  providers: [EmployeeService, VacationService, PrismaService],
})
export class AppModule {}
