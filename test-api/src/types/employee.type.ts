import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { VacationResponseDto } from './vacation.type';
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}
export interface CreateEmployeeDtoType {
  firstName: string;
  lastName: string;
}

export interface EmployeeFilterType {
  unavailableOnly?: boolean;
}

export class CreateEmployeeDto implements CreateEmployeeDtoType {
  @IsString()
  @ApiProperty({ description: 'First name of the employee', example: 'John' })
  firstName: string;

  @IsString()
  @ApiProperty({ description: 'Last name of the employee', example: 'Doe' })
  lastName: string;
}

export class EmployeesQueryDto implements EmployeeFilterType {
  @IsOptional()
  @IsBoolean()
  unavailableOnly?: boolean;
}

export class EmployeesResponseDto {
  @ApiProperty({ description: 'Employee ID', example: '1' })
  id: number;

  @ApiProperty({ description: 'Employee first name', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Employee last name', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'Status of employee current leave',
    example: 'true',
  })
  isAvailable: boolean;
}

export class EmployeeResponseDto {
  @ApiProperty({ description: 'Employee ID', example: '1' })
  id: number;

  @ApiProperty({ description: 'Employee first name', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Employee last name', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'List of vacations associated with the employee',
    type: [VacationResponseDto], // Indicate it's an array of VacationResponseDto
    required: false,
  })
  vacations: VacationResponseDto[];
}

export class GetDetailsEmployeeResponseDto {}
