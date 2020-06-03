import { LoginService } from './../core/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { loginUser } from './../graphql/user/mutations/mutations';
import { UserService } from './../core/services/user.service';
import { UserLoginInputDto } from './../core/models/objects/user/user-login.input.dto';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/objects/user/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output('navbar') readonly refreshNavBar: EventEmitter<any> = new EventEmitter();

  userLoginInput = new UserLoginInputDto();
  returnUrl: string;
  error: string;
  
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
  ) { }
  user = new User();

  ngOnInit() {
  }

  userLogin() {
    this.userService.login$(this.userLoginInput).subscribe(data => {
      if (data.result == true) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.refreshNavBar.emit();
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'error al iniciar sesión, comprueba los datos'
        console.log(data.result)
      }
    })
  }

  getUserCookie() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
  }
  logout() {
    let result = this.loginService.logout();
    console.log(result)
  }

}
