import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
