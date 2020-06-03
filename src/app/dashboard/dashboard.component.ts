import { updateTask } from './../graphql/task/mutations/mutations';
import { UpdateTaskInputDto } from './../core/models/objects/task/update-task.input.dto';
import { GetAllTaskInputDto } from './../core/models/objects/task/get-all-task.input.dto';
import { LoginService } from './../core/services/login.service';
import { TaskService } from './../core/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  error: string;
  tasks = [];
  newState: string;
  totalItems: number;
  page: number;
  previousPage: number;
  showPagination: boolean;
  maxOfPages: number;

  constructor(
    private taskService: TaskService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask(page?: number) {
    if (this.page == undefined) {
      this.page = 0;
      page = 0;
    }
    const user = this.loginService.getUserLogged();
    const getAllTaskInput = new GetAllTaskInputDto();
    getAllTaskInput.userId = user.id;

    this.taskService.getAllTask$(getAllTaskInput).subscribe(data => {
      this.calcMaxOfPage(data.task.length)
      if (data.task[page]) {
        this.tasks.push(data.task[page]);
        this.fixState();
      } else {
        this.error = 'No hay tareas';
      }

    });
  }

  fixState() {
      if (this.tasks[0].state == 'in_progress') {
        this.tasks[0].state = 'En progreso';
      }
      if (this.tasks[0].state == 'pending') {
        this.tasks[0].state = 'Pendiente';
      }
      if (this.tasks[0].state == 'paused') {
        this.tasks[0].state = 'Pausada';
      }
      if (this.tasks[0].state == 'cancelled') {
        this.tasks[0].state = 'Cancelada';
      }
  }


  nextPage() {
    if (this.page < this.maxOfPages) {
      this.previousPage = this.page;
      this.page++;
      this.tasks = [];
      this.getAllTask(this.page);
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page = this.previousPage;
      this.previousPage--;
      this.tasks = [];
      this.getAllTask(this.page);
    }

  }

  calcMaxOfPage(allItems) {
    this.maxOfPages = allItems;
    this.maxOfPages--;
    // console.log(this.maxOfPages)
  }

  saveStateTask(task) {
    const updateTask = new UpdateTaskInputDto();
    if(this.newState != undefined){
      updateTask.id = task.id;
      updateTask.name = task.name;
      updateTask.description = task.description;
      updateTask.startDate = task.startDate;
      updateTask.endDate = task.endDate;
      updateTask.state = this.newState;
      updateTask.userResponsibleId = this.loginService.getUserLogged().id;
      this.taskService.updateTask$(updateTask).subscribe(success => {
        this.tasks[0].state = this.newState;
        this.fixState()
      })
    }
  }
}
