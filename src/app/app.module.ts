import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { ApolloModule } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { StadisticComponent } from './stadistic/stadistic.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TaskComponent,
    NavBarComponent,
    LoginComponent,
    DashboardComponent,
    EditTaskComponent,
    StadisticComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
