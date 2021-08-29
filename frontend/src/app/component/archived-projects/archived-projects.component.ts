import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: [
    './archived-projects.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class ArchivedProjectsComponent implements OnInit {

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

    this.getArchivedProjects();
  }

  getArchivedProjects(){
    this.dataService.getArchivedProjects().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    });
  }

  userProfile(userId){
    this.router.navigate(['/userProfile'], {queryParams: {id:userId}});
  }

  destroyProject(id, data){
    this.dataService.destroyProject(id, data).subscribe(res =>{
      this.projectData = res;
      if(this.projectData.status === 1){
        this.toastr.success('Uspešno ste obrisali projekat', '', {
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

  activateProject(id, data){
    this.dataService.activateProject(id, data).subscribe(res => {
      this.projectData = res;
      if(this.projectData.status === 1){
        this.toastr.success('Uspešno ste aktivirali projekat', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }

}
