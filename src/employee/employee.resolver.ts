import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Query(() => [Employee], { nullable: true })
  async getAllEmployees(): Promise<Array<Employee>> {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee)
  createEmployee(
    @Args('employee') employee: EmployeeCreateDto,
  ): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @ResolveField(() => Project)
  project(@Parent() employee: Employee) {
    return this.projectService.findOne(employee.projectId);
  }
}
