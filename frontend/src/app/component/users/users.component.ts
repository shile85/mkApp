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
  username:string;
  roleId:string;
  searchTerm: string;
  page = 1;
  pageSize = 6;
  collectionSize: number;
  currentRate = 2;
  users: any;
  userData : any;


  constructor(
    private router:Router,
    private dataService: DataService,
    ) { }
  

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

    this.dataService.getAllUsers().subscribe(res => {
      this.users = res;
      this.userData = this.users;
      this.collectionSize = this.users.length;
    });

    

    
  }


  search(value: string): void {
    this.users = this.userData.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.users.length;
    console.log("users lenght",this.users);
    console.log('collection lenght',this.collectionSize);
  }

  userProfile(id){
    this.router.navigate(['/userProfile', id]);
  }

  deleteUser(id){
    this.dataService.deleteUser(id).subscribe(res => {
      this.ngOnInit();
    })
  }

  softDeleteUser(id){
    
  }



}
