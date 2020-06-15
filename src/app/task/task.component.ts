import { UserService } from './../core/services/user.service';
import { CreateTaskInputDto } from './../core/models/objects/task/create-task.input.dto';
import { TaskService } from './../core/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    editTask: any;
    newTask = new CreateTaskInputDto();
    usersActives: any[];
    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    createTask() {
        this.newTask.startDate = new Date(this.newTask.startDate);
        this.newTask.endDate = new Date(this.newTask.endDate);
        this.taskService.createTask$(this.newTask).subscribe(result => {
        }, error => {
        })
        this.newTask = new CreateTaskInputDto();
    }

    getUsers() {
        this.userService.getUsers$().subscribe(data => {
            this.usersActives = data.users;
        });
    }


}
