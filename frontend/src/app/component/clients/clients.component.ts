import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: [
    './clients.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class ClientsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  searchTerm: string;
  page = 1;
  pageSize = 5;
  collectionSize: number;
  currentRate = 2;
  companies: any;
  companyData: any;
  

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

    this.getActiveCompanies();

  }

  getActiveCompanies(){
    this.dataService.getActiveCompanies().subscribe(res => {
      this.companies = res;
      this.companyData = this.companies;
      this.collectionSize = this.companies.length;
    });
  }

  search(value: string): void {
    this.companies = this.companyData.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.companies.length;
  }

  deleteCompany(id, data){
    this.dataService.deleteCompany(id, data).subscribe(res =>{
      this.companyData = res;
      if(this.companyData.status === 1){
        this.toastr.success('Uspešno ste uklonili klijenta', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }

}
