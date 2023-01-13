import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { EmployeeService } from 'src/employee/employee.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Mutation(() => Project)
  createProject(@Args('project') project: CreateProjectInput) {
    return this.projectService.create(project);
  }

  @Query(() => [Project])
  getAllProjects() {
    return this.projectService.findAll();
  }

  @Query(() => Project)
  getProjectById(@Args('id', { type: () => String }) id: string) {
    return this.projectService.findOne(id);
  }

  @ResolveField()
  employees(@Parent() project: Project) {
    return this.employeeService.findAllByProject(project.id);
  }

  @Mutation(() => Project)
  updateProject(@Args('project') project: UpdateProjectInput) {
    return this.projectService.update(project.id, project);
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.remove(id);
  }
}
