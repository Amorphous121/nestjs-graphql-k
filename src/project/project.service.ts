import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(project: CreateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj);
  }

  findAll(): Promise<Array<Project>> {
    return this.projectRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectRepository.findOneBy({ id });
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
