import { Component, OnInit } from '@angular/core';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import {DataService} from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: [
    './project-details.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class ProjectDetailsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  project = new Project();
  projectId: any;
  projectData: any;
  tasks : any;
  taskData:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService: DataService, 
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.projectId = this.route.snapshot.queryParamMap.get('id');
    }

    this.getProjectById(this.projectId);
    this.getProjectTasks(this.projectId);
  }

  getProjectById($id){
    this.dataService.getProjectById($id).subscribe(res => {
      this.projectData = res;
      this.project= this.projectData;
      console.log(this.project);
    });
  }

  userProfile(userId){
    this.router.navigate(['/userProfile'], {queryParams: {id:userId}});
  }

  taskDetails(id){

  }

  editTask(id){

  }

  deleteTask(){

  }

  getProjectTasks($id){
    this.dataService.getProjectTasks($id).subscribe(res => {
      this.taskData = res;
      this.tasks= this.taskData;
      
      console.log(this.tasks);
    });
  }

  

}
