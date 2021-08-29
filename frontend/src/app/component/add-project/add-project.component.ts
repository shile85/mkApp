import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: [
    './add-project.component.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css',
  ]
})
export class AddProjectComponent implements OnInit {

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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService, 
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      projectName: [null, Validators.required],
      companyId: [null, Validators.required],
      userId: [null, Validators.required],
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

    this.getClients();
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
    console.log(this.form.value);
    this.dataService.addProject(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste dodali klijenta', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error("Greška pri registraciji klijenta", JSON.stringify(this.data.code), {
        timeOut: 2000,
        progressBar: true
      });
          
        
      }
      this.submitted = false;
      this.form.get('projectName').reset();
      this.form.get('companyId').reset();
      this.form.get('userId').reset();
      this.form.get('desc').reset();
      this.form.get('budget').reset();
      this.form.get('start').reset();
      this.form.get('end').reset();
  
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
}
