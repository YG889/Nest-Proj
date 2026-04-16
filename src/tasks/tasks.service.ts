import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  getAll() {
    return this.repo.find();
  }

  async getById(id: number) {
    const task = await this.repo.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const task = this.repo.create(dto);
    return this.repo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.getById(id);

    Object.assign(task, dto);

    return this.repo.save(task);
  }

  async delete(id: number) {
    const task = await this.getById(id);
    return this.repo.remove(task);
  }
}