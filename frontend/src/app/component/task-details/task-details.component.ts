import { Component, OnInit } from '@angular/core';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import {DataService} from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: [
    './task-details.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class TaskDetailsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  project = new Project();
  projectId: any;
  projectData: any;
  tasks : any;
  taskData:any;
  task = new Task;
  taskId : any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService: DataService, 
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.taskId = this.route.snapshot.queryParamMap.get('id');
    }
    this.getTaskById(this.taskId);
    
  }

  getTaskById(id){
    this.dataService.getTaskById(id).subscribe(res => {
      this.taskData = res;
      this.task= this.taskData;
      console.log(this.task);
    });
  }

}
