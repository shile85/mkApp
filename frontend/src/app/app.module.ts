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
    path: 'userProfile',
    component:UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editUserProfile',
    component:EditUserProfileComponent,
    canActivate: [RoleGuard, AuthGuard],
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
