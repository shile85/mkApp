import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.css',
    '/../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.css',
    '/../../../assets/dist/css/adminlte.css'
  ]
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  submitted = false;
  data:any;
  token:any;

  constructor(
    private dataService: DataService, 
    private toastr: ToastrService, 
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit() {

    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['home']);
        this.toastr.success('Logovanje uspešno izvršeno', '', {
          timeOut : 2000,
          progressBar: true
        });
      } else{
        switch(this.data.code){
          case 401:{
            this.toastr.error("Email ili lozinka nisu ispravni. Molim vas pokušajte ponovo", '', {
              timeOut: 3000,
              progressBar: true
            });
            break;
          }
          default:{
            this.toastr.error("Greška pri logovanju korisnika", JSON.stringify(this.data.code), {
              timeOut: 2000,
              progressBar: true
            });
          }
        }
      }

    })
  }

}
