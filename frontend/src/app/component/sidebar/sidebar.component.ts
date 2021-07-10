import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class SidebarComponent implements OnInit {

  token:any;
  userData:any;
  email:string;
  username:string;
  roleId:string;
  condition:boolean;

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    this.username = this.userData.name;
    this.roleId = this.userData.roleId;
    this.condition = true;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
