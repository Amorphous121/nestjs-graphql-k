import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Field()
  @Column()
  designation: string;

  @Field({ nullable: true })
  @Column()
  city: string;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.employees)
  project: Project;

  @Column()
  @Field()
  projectId: string;
}
