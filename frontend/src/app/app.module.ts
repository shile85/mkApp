import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UsersComponent } from './component/users/users.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from './table/listFilterPipe';
import { EditUserProfileComponent } from './component/edit-user-profile/edit-user-profile.component';
import { FooterComponent } from './component/footer/footer.component';
import { ClientsComponent } from './component/clients/clients.component';
import { ArchivedUsersComponent } from './component/archived-users/archived-users.component';
import { ArchivedClientsComponent } from './component/archived-clients/archived-clients.component';
import { AddClientsComponent } from './component/add-clients/add-clients.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ProjectDetailsComponent } from './component/project-details/project-details.component';
import { EditProjectComponent } from './component/edit-project/edit-project.component';
import { ArchivedProjectsComponent } from './component/archived-projects/archived-projects.component';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';



export const routes:Routes =  [
  {
    path: '', 
    component : LoginComponent
  },
  {
    path: 'register', 
    component:RegisterComponent,
    canActivate: [RoleGuard, AuthGuard
    ],
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component:UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'archivedUsers',
    component:ArchivedUsersComponent,
    canActivate: [RoleGuard, AuthGuard],
  },
  {
    path: 'userProfile',
    component:UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editUserProfile',
    component:EditUserProfileComponent,
    canActivate: [RoleGuard, AuthGuard],
  },
  {
    path: 'clients',
    component:ClientsComponent,
    canActivate: [RoleGuard, AuthGuard],
  },

  {
    path: 'archivedClients',
    component:ArchivedClientsComponent,
    canActivate: [RoleGuard, AuthGuard],
  },
  {
    path: 'addClient',
    component:AddClientsComponent,
    canActivate: [RoleGuard, AuthGuard],
  },
  {
    path: 'addProject',
    component:AddProjectComponent,
    canActivate: [RoleGuard, AuthGuard],
  },

  {
    path: 'projects',
    component:ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'archivedProjects',
    component:ArchivedProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projectDetails',
    component:ProjectDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProject',
    component:EditProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addTask',
    component:AddTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editTask',
    component:EditTaskComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    UserProfileComponent,
    ListFilterPipe,
    EditUserProfileComponent,
    FooterComponent,
    ClientsComponent,
    ArchivedUsersComponent,
    ArchivedClientsComponent,
    AddClientsComponent,
    AddProjectComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    EditProjectComponent,
    ArchivedProjectsComponent,
    AddTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
