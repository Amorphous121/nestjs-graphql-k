import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ProjectModule } from 'src/project/project.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => ProjectModule),
  ],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
