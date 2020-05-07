import { CreateUserInputDto } from './../core/models/objects/user/create-user.input.dto';
import { UpdateUserInput } from './../core/models/objects/user/updateUserInput';
import { getAllUsers } from '../graphql/user/queries/queries';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    usersActives: any[];
    usersDeleted: any[];
    newUser = new CreateUserInputDto();

    constructor(
        private apollo: Apollo,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.getUserActives();
        this.getUserDeleted();
        // this.createUser();
    }

    getUserActives() {
        this.userService.getUsersActives$().subscribe(data => {
            this.usersActives = data.users;
        });
    }

    getUserDeleted() {
        this.userService.getUsersDeleted$().subscribe(data => {
            this.usersDeleted = data.users;
            console.log(this.usersDeleted)
        });
    }

    updateUser(updateUser: UpdateUserInput) {
        this.userService.updateUser$(updateUser).subscribe();
    }

    createUser() {
        console.log(this.newUser)
        this.userService.createUser$(this.newUser).subscribe(result => {
            console.log(result)
        }, error => {
            console.log('error');
        })
        this.getUserActives();
    }

    deleteUser(user) {
        console.log(user)
    }

}
