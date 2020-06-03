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
        console.log(this.newTask)
        this.taskService.createTask$(this.newTask).subscribe(result => {
            console.log(result)
        }, error => {
            console.log('error')
        })

    }

    getUsers() {
        this.userService.getUsers$().subscribe(data => {
            this.usersActives = data.users;
        });
    }
}
