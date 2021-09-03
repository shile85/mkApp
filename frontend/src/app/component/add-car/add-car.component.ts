import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: [
    './add-car.component.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/dist/css/adminlte.min.css',
  ]
})
export class AddCarComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
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
      model: [null, Validators.required],
      registration: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

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
    this.dataService.addCar(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste dodali vozilo', '', {
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error("Greška pri registraciji vozila", JSON.stringify(this.data.code), {
        timeOut: 2000,
        progressBar: true
      });
          
        
      }
      this.submitted = false;
      this.form.get('model').reset();
      this.form.get('registration').reset();
    });

    
  }

}
