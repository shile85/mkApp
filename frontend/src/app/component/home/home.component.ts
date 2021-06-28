import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class HomeComponent implements OnInit {

  token:any;
  userData:any;
  email:string;
  username:string;
  roleId:BigInteger;

  constructor(
    private router:Router
    
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    this.username = this.userData.name;
    this.roleId = this.userData.roleId;
    // console.log(this.token);
    // console.log(this.userData);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
