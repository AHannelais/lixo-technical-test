import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEmployeeDto,
  Employee,
  EmployeeFilterType,
} from '../types/employee.type';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { firstName, lastName } = createEmployeeDto;

    return await this.prisma.employee.create({
      data: {
        firstName,
        lastName,
      },
    });
  }

  // Method to get all employees
  async getAll({ unavailableOnly }: EmployeeFilterType): Promise<Employee[]> {
    const where = unavailableOnly
      ? {
          vacations: {
            some: {
              endDate: {
                gte: new Date(), //Check if vacation has not ended
              },
              startDate: {
                lte: new Date(), // Check if vacation has started
              },
            },
          },
        }
      : {};

    return await this.prisma.employee
      .findMany({
        where,
        include: {
          vacations: {
            where: {
              OR: [
                {
                  startDate: { lte: new Date() },
                  endDate: { gte: new Date() },
                }, // Ongoing vacation
              ],
            },
          },
        },
      })
      .then((employees) =>
        employees.map((employee) => ({
          ...employee,
          isAvailable: !employee.vacations.length, // Check if employee is on leave
        })),
      );
  }

  async getDetails(employeeId: number) {
    // Fetch employee with their vacation records
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        vacations: {
          orderBy: {
            startDate: 'asc', // Sort vacations by start date
          },
        },
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }
}
