import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {

  title = 'mkApp';

  token:any;
  condition:boolean;

  constructor(
    private router:Router
    
    ) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.condition = true;
    }else{
      this.condition = false;
    }
    

  }

  
  
}
