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
  userId:string;
  userProfileId:string;
  roleId:string;
  firstName:string;
  user = new Register();
  form:FormGroup;
  submitted = false;
  data:any;
  userRoleId: string;
  userRoleData: any;
  roleName: string;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null],
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.email]],
      address: [null],
      city: [null],
      telephone: [null],
      businessPhone: [null],
      birthDay: [null],
      roleId: [null],
      
    });
  }

  ngOnInit(): void {

    this.createForm();

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userId = this.userData.userId;
    this.roleId = this.userData.roleId;
    this.firstName = this.userData.firstName;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.userProfileId = this.route.snapshot.queryParamMap.get('id');
    }

    this.getData();

  }

  get f(){
    return this.form.controls;
  }

  getData(){
   this.dataService.getUserById(this.userProfileId).subscribe(res => {
     this.userProfileData = res;
     this.user = this.userProfileData;
   });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  updateUserData(){
    this.submitted = true;
    console.log(this.user);
    this.dataService.updateUserData(this.userProfileId, this.user).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili podatke korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      
    })
  }

}
