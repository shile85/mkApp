import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Register } from 'src/app/models/register.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from './confirmed.validator';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: [
    './edit-user-profile.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css']
})
export class EditUserProfileComponent implements OnInit {

  token:any;
  userData:any;
  userProfileData:any;
  id:string;
  userId:string;
  roleId:string;
  firstName:string;
  user = new Register();
  form:FormGroup;
  submitted = false;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      roleId: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(6)]],
      confirmPassword:[null, [Validators.required]],
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {

    this.createForm();

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.userId;
    this.roleId = this.userData.roleId;
    this.firstName = this.userData.firstName;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.userId = this.route.snapshot.queryParamMap.get('id');
    }

    this.getData();

  }

  get f(){
    return this.form.controls;
  }

  getData(){
   this.dataService.getUserById(this.userId).subscribe(res => {
     this.userProfileData = res;
     console.log(this.userProfileData);
     this.user = this.userProfileData;
     
   })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
