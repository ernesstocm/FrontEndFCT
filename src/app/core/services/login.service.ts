import { Injectable } from '@angular/core';
import { User } from '../models/objects/user/user';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })

export class LoginService {
    user = new User();
    constructor(
        private readonly apollo: Apollo,
        private cookieService: CookieService,

    ) { }

    isLogged(){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user == null) {
            return false;
        } else {
            return true;
        }
    }
    getUserLogged() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user == null) {
            return this.user;
        } else {
            return this.user;
        }
    }
    logout() {
        localStorage.removeItem('currentUser');
        return true;
    }
}