import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import {
  CreateEmployeeDto,
  EmployeeResponseDto,
  EmployeesQueryDto,
  EmployeesResponseDto,
} from '../types/employee.type';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // POST route to create a new employee
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Successfully created vacation entry',
    type: EmployeeResponseDto,
  })
  @ApiOperation({ summary: 'create employee entry' })
  @ApiBody({ type: CreateEmployeeDto })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  // GET route to retrieve all employees
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved employee data',
    type: EmployeesResponseDto,
  })
  @ApiQuery({
    name: 'unavailableOnly',
    required: false,
    type: Boolean,
    description: 'Filter employees by availability (optional)',
  })
  async getAll(@Query() query: EmployeesQueryDto) {
    return this.employeeService.getAll(query);
  }

  // GET route to retrieve employee details, including vacations
  @Get(':employeeId')
  @ApiOperation({ summary: 'get employee details' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved employee data',
    type: EmployeeResponseDto,
  })
  async getDetails(@Param('employeeId') employeeId: string) {
    const id = parseInt(employeeId, 10);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid employee ID');
    }

    return this.employeeService.getDetails(id);
  }
}
