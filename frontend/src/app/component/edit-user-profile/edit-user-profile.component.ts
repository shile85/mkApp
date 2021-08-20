import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Register } from 'src/app/models/register.model';
import { Image } from 'src/app/models/image.model';

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
  imageForm:FormGroup;
  imageData:any;
  submitted = false;
  data:any;
  userRoleId: string;
  userRoleData: any;
  roleName: string;
  files:any;

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

  createFormImage(){
    this.imageForm = this.formBuilder.group({
      image: [null, Validators.required]
    })
  }

  ngOnInit(): void {

    this.createForm();
    this.createFormImage();

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

  get fImage(){
    return this.imageForm.controls;
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

  uploadImage(event){
    this.files = event.target.files[0];
  }

  submitUploadImage(){
    this.submitted = true;
    if(this.imageForm.invalid){
      return;
    }
    const formData = new FormData();
    formData.append("image", this.files, this.files.name);

    this.dataService.uploadImage(this.userProfileId, formData).subscribe(res=>{
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili fotografiju korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.success('Uspešno ste izmenili fotografiju korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
        this.imageForm.get('image').reset();
      }
    })

  }

}
