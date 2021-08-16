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

  deleteUser(id){
    return this.http.delete(environment.apiUrl+'/api/deleteUser/'+id)
  }

  softDeleteUser(id, data){
    return this.http.put(environment.apiUrl+'/api/softDeleteUser/'+id, data)
  }

  updateUserData(id, data){
    return this.http.put(environment.apiUrl+'/api/updateUser/'+id, data);
  }

  getUserById(id){
    return this.http.get(environment.apiUrl+'/api/user/'+id)
  }


  // ROLE

  getRoleById(id){
    return this.http.get(environment.apiUrl+'/api/role/'+id)
  }
  
}
