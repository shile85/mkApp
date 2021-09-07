import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from './confirmed.validator';
import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/dist/css/adminlte.min.css',
]
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  submitted = false;
  data:any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService, 
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      position: [null],
      address: [null],
      city: [null],
      telephone: [null],
      businessPhone: [null],
      birthDay: [null],
      roleId: [null, Validators.required],
      password:[null, [Validators.required, Validators.minLength(6)]],
      confirmPassword:[null, [Validators.required]],
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){

    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste registrovali korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        switch(this.data.code){
          case 409:{
            this.toastr.error("Korisnik sa unetom email adresom već postoji", '', {
              timeOut: 2000,
              progressBar: true
            });
            break;
          }
          default:{
            this.toastr.error("Greška pri registraciji korisnika", JSON.stringify(this.data.code), {
              timeOut: 2000,
              progressBar: true
            });
          }
        }
      }
      this.submitted = false;
      this.form.get('name').reset();
      this.form.get('firstName').reset();
      this.form.get('lastName').reset();
      this.form.get('email').reset();
      this.form.get('position').reset();
      this.form.get('address').reset();
      this.form.get('city').reset();
      this.form.get('telephone').reset();
      this.form.get('businessPhone').reset();
      this.form.get('birthDay').reset();
      this.form.get('roleId').reset();
      this.form.get('password').reset();
      this.form.get('confirmPassword').reset();
    });

    
  }

  
  

}
