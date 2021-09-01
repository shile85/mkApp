import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: [
    './edit-task.component.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css',
  ]
})
export class EditTaskComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  form:FormGroup;
  submitted = false;
  data:any;
  users:any;
  userData:any;
  task = new Task;
  taskId:any;
  taskData:any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService, 
    private toastr: ToastrService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      taskName: [null, Validators.required],
      description: [null],
      userId: [null, Validators.required],
      projectId: this.task.projectId,
    });
  }

  ngOnInit(): void {

    if(this.route.snapshot.queryParamMap.get('id')){
      this.taskId = this.route.snapshot.queryParamMap.get('id');
    }

    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;
    this.createForm();

    this.getTaskById(this.taskId);

    

    this.getUsers();

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.updateTaskData(this.taskId, this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili zaduženje', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error("Greška pri promeni zaduženja", JSON.stringify(this.data.code), {
        timeOut: 2000,
        progressBar: true
      });
          
        
      }
      this.submitted = false;
      this.form.get('taskName').reset();
      this.form.get('projectId').reset();
      this.form.get('userId').reset();
      this.form.get('description').reset();
    });

    
  }

  getTaskById($id){
    this.dataService.getTaskById($id).subscribe(res => {
      this.taskData = res;
      this.task = this.taskData;
      console.log(this.task);
    });
  }

  getUsers(){
    this.dataService.getActiveUsers().subscribe(res => {
      this.users = res;
      this.userData = this.users;
    });
  }

  projectDetails(projectId){
    this.router.navigate(['/projectDetails'], {queryParams: {id:projectId}});
  }


  

}
