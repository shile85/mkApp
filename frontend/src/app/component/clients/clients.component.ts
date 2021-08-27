import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

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

  searchTerm: string;
  page = 1;
  pageSize = 7;
  collectionSize: number;
  currentRate = 2;
  companies: any;
  companyData: any;
  

  constructor(
    private router:Router,
    private dataService: DataService,
    ) { }

  ngOnInit(): void {

    this.getCompanies();

  }

  getCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
      this.companyData = this.companies;
      this.collectionSize = this.companies.length;
    });
  }

  search(value: string): void {
    this.companies = this.companyData.filter((val) => val.companyName.toLowerCase().includes(value));
    this.collectionSize = this.companies.length;
  }

}
