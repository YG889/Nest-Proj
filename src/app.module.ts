import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  autoLoadEntities: true,
  synchronize: true,
}),

    TasksModule,
  ],
})
export class AppModule {}