import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: [
    './cars.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class CarsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  cars: any;
  carData: any;

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

    this.getCars();

  }

  getCars(){
    this.dataService.getCars().subscribe(res => {
      this.cars = res;
    });
  }


  editCar(id){
    this.router.navigate(['/editCar'], {queryParams: {id:id}});
  }

  deleteCar(id){
    this.dataService.deleteCar(id).subscribe(res =>{
      this.carData = res;
      if(this.carData.status === 1){
        this.toastr.success('Uspešno ste uklonili vozilo', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }


}
