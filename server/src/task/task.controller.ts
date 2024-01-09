import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }
  
  @Post()
  @UseGuards(AuthGuard())
  async createTask(
    @Body()
    task: CreateTaskDto,
    @Req() req,
  ): Promise<Task> {
    // console.log(req.user)
    return this.taskService.create(task, req.user);
  }

  // @Get(':id')
  // async getTask(@Param('id') id: string): Promise<Task> {
  //   return this.taskService.findById(id);
  // }
  @Patch(':id')
  async updateTask(
    @Param('id')
    id: string,

    @Body()
    task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateById(id, task);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteById(id);
  }
}
