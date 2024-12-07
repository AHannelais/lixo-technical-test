import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export interface Employee {
  id: number;
  startDate: string;
  endDate: string;
  comment: string;

  employeeId: number;
}

export class CreateVacationDto {
  @ApiProperty({
    description: 'starting date of vacation',
    example: '2024-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'starting date of vacation',
    example: '2024-01-01',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'desciption of the reason of vacation',
    example: "It's christmas !",
  })
  @IsOptional()
  @IsString()
  comment?: string; // Optional field
}

export class VacationResponseDto {
  @ApiProperty({ description: 'Vacation ID' })
  id: number;

  @ApiProperty({ description: 'Start date of the vacation' })
  startDate: Date;

  @ApiProperty({ description: 'End date of the vacation' })
  endDate: Date;

  @ApiProperty({ description: 'Comment for the vacation', required: false })
  comment?: string;
}
