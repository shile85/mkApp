import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

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
  firstName:string;
  roleId:string;

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.firstName = this.userData.firstName;
    this.roleId = this.userData.roleId;
  }




}
