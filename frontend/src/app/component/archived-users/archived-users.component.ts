import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: [
    './archived-users.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.css',
    '/../../../assets/dist/css/adminlte.css'
  ]
})
export class ArchivedUsersComponent implements OnInit {

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

    this.getArchivedUsers();
  }

  getArchivedUsers(){
    this.dataService.getArchivedUsers().subscribe(res => {
      this.users = res;
      this.userData = this.users;
      this.collectionSize = this.users.length;
    });
  }

  search(value: string): void {
    this.users = this.userData.filter((val) => val.email.toLowerCase().includes(value));
    this.collectionSize = this.users.length;
  }

  deleteUser(id){
    this.dataService.deleteUser(id).subscribe(res => {
      this.userData = res;
      if(this.userData.status === 1){
        this.toastr.success('Uspešno ste obrisali korisnika', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }

  activateUser(id, data){
    this.dataService.activateUser(id, data).subscribe(res => {
      this.ngOnInit();
    })
  }

  userProfile(userId){
    this.router.navigate(['/userProfile'], {queryParams: {id:userId}});
  }

  editUserProfile(userId){
    this.router.navigate(['/editUserProfile'], {queryParams: {id:userId}});
  }

}
