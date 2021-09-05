import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class HomeComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  projects: any;
  tasks: any;
  projectData: any;
  userId:any;
  projectsLength: any;
  tasksLength: any;

  constructor(
    private router:Router,
    private dataService: DataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;
    this.userId = this.tokenData.userId;

    this.getMyProjects();
    this.getAllUserTasks();
  }

  getMyProjects(){
    this.dataService.getMyProjects(this.userId).subscribe(res => {
      this.projects = res;
      this.projectsLength = this.projects.length
    });
  }

  taskDetails(id){
    this.router.navigate(['/taskDetails'], {queryParams: {id:id}});
  }

  deleteProject(id, data){
    this.dataService.deleteProject(id, data).subscribe(res =>{
      this.projectData = res;
      if(this.projectData.status === 1){
        this.toastr.success('Uspešno ste arhivirali projekat', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }

  projectDetails(projectId){
    this.router.navigate(['/projectDetails'], {queryParams: {id:projectId}});
  }

  editProject(projectId){
    this.router.navigate(['/editProject'], {queryParams: {id:projectId}});
  }

  getAllUserTasks(){
    this.dataService.getAllUserTasks(this.userId).subscribe(res => {
      this.tasks = res;
      this.tasksLength = this.tasks.length
    });
  }

}
