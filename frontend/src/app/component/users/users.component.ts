import {Component, Input, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.css',
    '/../../../assets/dist/css/adminlte.css'

  ]
})
export class UsersComponent implements OnInit{

  token:any;
  tokenData:any;
  userData:any;
  username:string;
  roleId:string;
  searchTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 8;
  users: any;


  constructor(
    private router:Router,
    private dataService: DataService,
    ) { }
  

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

    this.getUserData();
    
  }

  getUserData(){
    this.dataService.getAllUsers().subscribe(res => {
      this.users = res;
      this.userData = this.users;
      this.collectionSize = this.userData.lenght;
    });

  }

  search(value: string): void {
    this.users = this.userData.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.users.length;
  }


}
