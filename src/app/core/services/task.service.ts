import { UpdateTaskInputDto } from './../models/objects/task/update-task.input.dto';
import { getTaskActive } from './../../graphql/task/queries/queries';
import { GetAllTaskInputDto } from './../models/objects/task/get-all-task.input.dto';
import { createTask, updateTask } from './../../graphql/task/mutations/mutations';
import { CreateTaskInputDto } from './../models/objects/task/create-task.input.dto';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class TaskService {
    constructor(
        private readonly apollo: Apollo) { }


    createTask$(createTaskInputDto: CreateTaskInputDto) {
        return this.apollo
            .mutate({
                mutation: createTask,
                variables: {
                    createTaskInputDto
                }
            }).pipe(map(result => {
                return result.data['createTask'];
            }));
    }
    
    updateTask$(updateTaskInputDto: UpdateTaskInputDto) {
        return this.apollo
            .mutate({
                mutation: updateTask,
                variables: {
                    updateTaskInputDto
                }
            }).pipe(map(result => {
                return result.data['updateTask'];
            }));
    }

    getAllTask$(getTaskActiveInput: GetAllTaskInputDto) {
        return this.apollo
            .mutate({
                mutation: getTaskActive,
                variables: {
                    getTaskActiveInput
                }
            }).pipe(map(result => {
                return result.data['getTaskActive'];
            }));
    }
}