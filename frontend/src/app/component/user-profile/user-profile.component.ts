import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css']
})
export class UserProfileComponent implements OnInit {

  token:any;
  userData:any;
  id:string;
  userId:string;
  roleId:string;
  firstName:string;

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.userId;
    this.roleId = this.userData.roleId;
    this.firstName = this.userData.firstName;

    if(this.route.snapshot.paramMap.get('id')){
      this.userId = this.route.snapshot.paramMap.get('id');
    }

  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}