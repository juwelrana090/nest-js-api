import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        console.log('filterDto', filterDto);
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskByFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }


    // createTask(
    //     @Body('title') title,
    //     @Body('description') description
    // ): Task {
    //     return this.tasksService.createTask(title, description);
    // }

    //     createTask(@Body() body) {
    //         console.log('body',body);
    //     }
    // }

}

