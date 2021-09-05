import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Register } from 'src/app/models/register.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css']
})
export class UserProfileComponent implements OnInit {

  token:any;
  userData:any;
  id:string;
  userProfileId:string;
  roleId:string;
  firstName:string;
  userProfileData:any;
  user = new Register();
  userProfileDocuments:any;
  projects: any;
  tasks: any;
  projectData: any;
  userId:any;
  projectsLength: any;
  tasksLength: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.userId;
    this.roleId = this.userData.roleId;
    this.firstName = this.userData.firstName;
    this.userId = this.userData.userId;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.userProfileId = this.route.snapshot.queryParamMap.get('id');

      this.getData();
      this.getUserDocuments();
      this.getMyProjects();
      this.getAllUserTasks();
    }



  }

  getData(){
   this.dataService.getUserById(this.userProfileId).subscribe(res => {
    this.userProfileData = res;
    this.user = this.userProfileData;
   });
  }
  getUserDocuments(){
    this.dataService.getUserDocuments(this.userProfileId).subscribe(res => {
      this.userProfileDocuments = res;
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getMyProjects(){
    this.dataService.getMyProjects(this.userProfileId).subscribe(res => {
      this.projects = res;
      this.projectsLength = this.projects.length
    });
  }

  taskDetails(id){
    this.router.navigate(['/taskDetails'], {queryParams: {id:id}});
  }

  deleteProject(id, data){
    this.dataService.deleteProject(id, data).subscribe(res =>{
      this.projectData = res;
      if(this.projectData.status === 1){
        this.toastr.success('Uspešno ste arhivirali projekat', '', {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.ngOnInit();
    })
  }

  projectDetails(projectId){
    this.router.navigate(['/projectDetails'], {queryParams: {id:projectId}});
  }

  editProject(projectId){
    this.router.navigate(['/editProject'], {queryParams: {id:projectId}});
  }

  getAllUserTasks(){
    this.dataService.getAllUserTasks(this.userProfileId).subscribe(res => {
      this.tasks = res;
      this.tasksLength = this.tasks.length
      console.log(this.tasks);
    });
  }

}
