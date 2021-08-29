import { Component, OnInit } from '@angular/core';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: [
    './project-details.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class ProjectDetailsComponent implements OnInit {

  token:any;
  tokenData:any;
  username:string;
  roleId:string;
  project = new Project();
  projectId: any;
  projectData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
