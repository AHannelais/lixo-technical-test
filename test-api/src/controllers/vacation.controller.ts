import {
  Controller,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { VacationService } from '../services/vacation.service';
import { CreateVacationDto, VacationResponseDto } from '../types/vacation.type';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('vacations')
@Controller('vacations')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  // POST route to add a vacation for an employee
  @Post(':employeeId')
  @ApiResponse({
    status: 201,
    description: 'Successfully created vacation entry',
    type: VacationResponseDto,
  })
  @ApiBody({ type: CreateVacationDto })
  async addVacation(
    @Param('employeeId') employeeId: string,
    @Body() createVacationDto: CreateVacationDto,
  ) {
    const id = parseInt(employeeId, 10);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid employee ID');
    }

    return this.vacationService.create(id, createVacationDto);
  }
}
