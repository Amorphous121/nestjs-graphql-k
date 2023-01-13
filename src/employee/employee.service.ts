import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeCreateDto } from './dto/create-employee.input';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  findAll(): Promise<Array<Employee>> {
    return this.employeeRepository.find();
  }

  findAllByProject(projectId: string) {
    return this.employeeRepository.find({ where: { projectId } });
  }

  create(employee: EmployeeCreateDto): Promise<Employee> {
    const emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }
}
