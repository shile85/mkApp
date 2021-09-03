import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // USERS

  registerUser(data){
    return this.http.post(environment.apiUrl+'/api/register',data);
  }

  login(data){
    return this.http.post(environment.apiUrl+'/api/login', data)
  }

  getAllUsers(){
    return this.http.get(environment.apiUrl+'/api/users')
  }

  getActiveUsers(){
    return this.http.get(environment.apiUrl+'/api/activeUsers')
  }

  getArchivedUsers(){
    return this.http.get(environment.apiUrl+'/api/getArchivedUsers')
  }

  deleteUser(id){
    return this.http.delete(environment.apiUrl+'/api/deleteUser/'+id)
  }

  softDeleteUser(id, data){
    return this.http.put(environment.apiUrl+'/api/softDeleteUser/'+id, data)
  }
  
  activateUser(id, data){
    return this.http.put(environment.apiUrl+'/api/activateUser/'+id, data)
  }

  updateUserData(id, data){
    return this.http.put(environment.apiUrl+'/api/updateUser/'+id, data);
  }

  getUserById(id){
    return this.http.get(environment.apiUrl+'/api/user/'+id)
  }

  uploadImage(id, data){
    return this.http.post(environment.apiUrl+'/api/image/'+id, data)
  }


  // DOCUMENT

  uploadDocument(id, data){
    return this.http.post(environment.apiUrl+'/api/document/'+id, data)
  }

  getUserDocuments(id){
    return this.http.get(environment.apiUrl+'/api/getUserDocuments/'+id)
  }

  deleteUserDocument(id){
    return this.http.delete(environment.apiUrl+'/api/deleteUserDocument/'+id)
  }



  // ROLE

  getRoleById(id){
    return this.http.get(environment.apiUrl+'/api/role/'+id)
  }

  //COMPANIES

  getCompanies(){
    return this.http.get(environment.apiUrl+'/api/getCompanies')
  }

  getActiveCompanies(){
    return this.http.get(environment.apiUrl+'/api/getActiveCompanies')
  }

  getArchivedCompanies(){
    return this.http.get(environment.apiUrl+'/api/getArchivedCompanies')
  }

  deleteCompany(id, data){
    return this.http.delete(environment.apiUrl+'/api/deleteCompany/'+id, data)
  }

  destroyCompany(id, data){
    return this.http.delete(environment.apiUrl+'/api/destroyCompany/'+id, data)
  }

  addCompany(data){
    return this.http.post(environment.apiUrl+'/api/addCompany/',data)
  }

  activateCompany(id, data){
    return this.http.put(environment.apiUrl+'/api/activateCompany/'+id, data)
  }

  //PROJECTS

  addProject(data){
    return this.http.post(environment.apiUrl+'/api/addProject/',data)
  }

  getActiveProjects(){
    return this.http.get(environment.apiUrl+'/api/getActiveProjects')
  }

  getArchivedProjects(){
    return this.http.get(environment.apiUrl+'/api/getArchivedProjects')
  }

  deleteProject(id, data){
    return this.http.delete(environment.apiUrl+'/api/deleteProject/'+id, data)
  }

  destroyProject(id, data){
    return this.http.delete(environment.apiUrl+'/api/destroyProject/'+id, data)
  }

  activateProject(id, data){
    return this.http.put(environment.apiUrl+'/api/activateProject/'+id, data)
  }

  updateProjectData(id, data){
    return this.http.put(environment.apiUrl+'/api/editProject/'+id, data);
  }

  getProjectById(id){
    return this.http.get(environment.apiUrl+'/api/getProjectById/'+id)
  }

  //TASKS

  getProjectTasks(id){
    return this.http.get(environment.apiUrl+'/api/getAllProjectTasks/'+id)
  }

  addTask(data){
    return this.http.post(environment.apiUrl+'/api/addTask/',data)
  }

  destroyTask(id, data){
    return this.http.delete(environment.apiUrl+'/api/destroyTask/'+id, data)
  }

  updateTaskData(id, data){
    return this.http.put(environment.apiUrl+'/api/editTask/'+id, data);
  }

  getTaskById(id){
    return this.http.get(environment.apiUrl+'/api/getTaskById/'+id)
  }

  //CARS

  addCar(data){
    return this.http.post(environment.apiUrl+'/api/addCar/',data)
  }

  getCars(){
    return this.http.get(environment.apiUrl+'/api/getCars')
  }

  deleteCar(id){
    return this.http.delete(environment.apiUrl+'/api/deleteCar/'+id)
  }



  
  
}
