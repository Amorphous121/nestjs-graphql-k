import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'nest-graphql',
      host: 'localhost',
      port: 3306,
      synchronize: true,
      autoLoadEntities: true,
      logger: 'advanced-console',
      logging: true,
      username: 'pratham',
      password: '1234',
    }),
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
