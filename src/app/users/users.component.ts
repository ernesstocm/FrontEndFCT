import { LoginService } from './../core/services/login.service';
import { ActiveUserInputDto } from './../core/models/objects/user/active-user.input.dto';
import { DeleteUserInputDto } from './../core/models/objects/user/delete-user.input.dto';
import { CreateUserInputDto } from './../core/models/objects/user/create-user.input.dto';
import { UpdateUserInput } from './../core/models/objects/user/updateUserInput';
import { getAllUsers } from '../graphql/user/queries/queries';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users = [];
    usersDeleted: any[];
    newUser = new CreateUserInputDto();
    correctEmail = false;
    totalItems: number;
    page: number;
    previousPage: number;
    showPagination: boolean;
    maxOfPages: number;
    constructor(
        private apollo: Apollo,
        private userService: UserService,
        private router: Router,
        private loginService: LoginService,

    ) { }

    ngOnInit() {
        this.isAdmin();
        this.getUsers(this.page);
        // this.createUser();
    }

    getUsers(page?: number) {
        this.users = [];
        if (this.page == undefined) {
            this.page = 0;
            page = 0;
        }
        this.userService.getUsers$().subscribe(data => {
            if (data && data.users && data.users.length == 0) {
                this.users = [];
                this.showPagination = false;
            } else {
                if (data.users[page]) {
                    this.users.push(data.users[page]);
                }
                if (data.users[page + 1]) {
                    this.users.push(data.users[page + 1]);
                }
                if (data.users[page + 2]) {
                    this.users.push(data.users[page + 2]);
                }
                this.totalItems = data.users.length;
                this.showPagination = true;
                this.calcMaxOfPage();
            }
        });
    }


    // updateUser(updateUser: UpdateUserInput) {
    //     this.userService.updateUser$(updateUser).subscribe();
    // }

    createUser() {
        this.userService.createUser$(this.newUser).subscribe(result => {
        }, error => {
            console.log('error');
        })
        this.refresh();
    }

    deleteUser(user) {
        const deleteUserInput = new DeleteUserInputDto;
        user.deleted = true;
        deleteUserInput.idUser = user.id;
        this.userService.deleteUser$(deleteUserInput).subscribe(data => { })
        this.users = [];
        this.page = 0;
        this.getUsers(this.page);
    }

    activeUser(user) {
        const activeUserInput = new ActiveUserInputDto;
        user.deleted = false;
        activeUserInput.idUser = user.id;
        this.userService.activeUser$(activeUserInput).subscribe(data => { })
        this.users = [];
        this.page = 0;
        this.getUsers(this.page);
    }

    nextPage() {
        this.previousPage = this.page;
        if (this.page < this.maxOfPages) {
            this.page++;
        }
        this.users = [];
        this.getUsers(this.page);
    }

    prevPage() {
        this.page = this.previousPage;
        if (this.previousPage > 0) {
            this.previousPage--;
        }
        this.users = [];
        this.getUsers(this.page);

    }

    calcMaxOfPage() {
        this.maxOfPages = Math.round(this.totalItems / 3);
    }
    refresh() {
        window.location.reload()
    }

    isAdmin() {
        const user = this.loginService.getUserLogged();
        if (user != null) {
            if (user.role == 'role_superadmin' || user.role == 'role_superadmin') {
            } else {
                this.loginService.logout();
            }
        }
    }


    checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.correctEmail = re.test(email);
    }

}
