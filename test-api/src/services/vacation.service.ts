import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVacationDto } from '../types/vacation.type';

@Injectable()
export class VacationService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to add a vacation for an employee
  async create(employeeId: number, createVacationDto: CreateVacationDto) {
    // Check if the employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Set start date to 00:00:00 and end date to 23:59:59
    const formatedStartDate = new Date(createVacationDto.startDate).setHours(
      0,
      0,
      0,
      0,
    );
    const formatedEndDate = new Date(createVacationDto.endDate).setHours(
      23,
      59,
      59,
      999,
    );

    // Create the vacation record
    return await this.prisma.vacation.create({
      data: {
        startDate: new Date(formatedStartDate),
        endDate: new Date(formatedEndDate),
        comment: createVacationDto.comment,
        employeeId,
      },
    });
  }
}
