import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: [
    './edit-project.component.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css',
  ]
})
export class EditProjectComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  form:FormGroup;
  submitted = false;
  data:any;
  users:any;
  userData:any;
  companies:any;
  companyData:any;
  project = new Project();
  projectId: any;
  projectData: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService, 
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      projectName: [null, Validators.required],
      companyId: [null,],
      userId: [null, ],
      desc: [null],
      budget: [null],
      start: [null],
      end: [null]
    });
  }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;
    this.createForm();

    if(this.route.snapshot.queryParamMap.get('id')){
      this.projectId = this.route.snapshot.queryParamMap.get('id');
    }

    this.getClients();
    this.getUsers();
    this.getProjectById(this.projectId);
  }

  get f(){
    return this.form.controls;
  }

  updateProjectData(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.updateProjectData(this.projectId, this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili podatke projekta', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error("Greška pri izmeni podataka", JSON.stringify(this.data.code), {
        timeOut: 2000,
        progressBar: true
      });
          
        
      }
      this.submitted = false;
  
    });

    
  }

  getUsers(){
    this.dataService.getActiveUsers().subscribe(res => {
      this.users = res;
      this.userData = this.users;
    });
  }

  getClients(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
      this.companyData = this.companies;
    });
  }

  getProjectById($id){
    this.dataService.getProjectById($id).subscribe(res => {
      this.projectData = res;
      this.project= this.projectData;
      console.log(this.project);
    });
  }

}
