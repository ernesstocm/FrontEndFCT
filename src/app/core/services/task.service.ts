import { createTask } from './../../graphql/task/mutations/mutations';
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
                console.log(result)
                return result.data['createTask'];
            }));
    }
}