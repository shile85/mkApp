import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [
    './projects.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  
  ]
})
export class ProjectsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  projects: any;
  tasks: any;
  projectData: any;

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

    this.getActiveProjects();

  }

  getActiveProjects(){
    this.dataService.getActiveProjects().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    });
  }

  userProfile(userId){
    this.router.navigate(['/userProfile'], {queryParams: {id:userId}});
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

}
