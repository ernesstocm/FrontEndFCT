import { TaskService } from './../../core/services/task.service';
import { UpdateTaskInputDto } from './../../core/models/objects/task/update-task.input.dto';
import { Component,Input, OnInit } from '@angular/core';
import { updateTask } from 'src/app/graphql/task/mutations/mutations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: any;
  updateTaskInput = new UpdateTaskInputDto();

  constructor(
    private taskService: TaskService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getTarea()
  }

  getTarea(){
    this.task = JSON.parse(localStorage.getItem('tareaToEdit'));
    this.setTarea()
    console.log(this.task)
  }

  setTarea(){
    this.updateTaskInput.id = this.task.id;
    this.updateTaskInput.name = this.task.name;
    this.updateTaskInput.startDate = this.task.startDate;
    this.updateTaskInput.endDate = this.task.endDate;
    this.updateTaskInput.description = this.task.description;
  }

  updateTask(){
    console.log(this.updateTaskInput)
    this.taskService.updateTask$(this.updateTaskInput).subscribe(data =>{
      this.router.navigate(['dashboard']);

    })
  }
}
