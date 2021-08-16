import {Component, Input, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

import { ToastrModule, ToastrService } from 'ngx-toastr';


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
  pageSize = 7;
  collectionSize: number;
  currentRate = 2;
  users: any;
  userData : any;
  data:any;


  constructor(
    private router:Router,
    private dataService: DataService,
    private toastr: ToastrService,
    ) { }
  

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenData = jwt_decode(this.token);
    this.username = this.tokenData.name;
    this.roleId = this.tokenData.roleId;

    this.dataService.getActiveUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
      this.userData = this.users;
      this.collectionSize = this.users.length;
    });

    

    
  }


  search(value: string): void {
    this.users = this.userData.filter((val) => val.email.toLowerCase().includes(value));
    this.collectionSize = this.users.length;
  }

  userProfile(userId){
    this.router.navigate(['/editUserProfile'], {queryParams: {id:userId}});
  }

  deleteUser(id){
    this.dataService.deleteUser(id).subscribe(res => {
      this.ngOnInit();
    })
  }

  softDeleteUser(id, data){
    this.dataService.softDeleteUser(id, data).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste uklonili korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
    })
  }



}
