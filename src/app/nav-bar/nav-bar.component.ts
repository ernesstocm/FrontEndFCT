import { LoginService } from './../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models/objects/user/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user = new User;
  login: boolean;
  admin = false;
  constructor(
    private loginService: LoginService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.login = this.loginService.isLogged();
    this.isAdmin();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  isAdmin() {
    this.user = this.loginService.getUserLogged();
    if(this.user != null){
      if (this.user.role == 'role_superadmin' || this.user.role == 'role_superadmin') {
        this.admin = true;
      }
    }
  }


}