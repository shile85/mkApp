import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  registerUser(data){
    return this.http.post(environment.apiUrl+'/api/register',data);
  }

  login(data){
    return this.http.post(environment.apiUrl+'/api/login', data)
  }

  getAllUsers(){
    return this.http.get(environment.apiUrl+'/api/users')
  }

  deleteUser(id){
    return this.http.delete(environment.apiUrl+'/api/deleteUser/'+id)
  }

  softDeleteUser(id){
    // return this.http.get(environment.apiUrl+'/api/softDeleteUser/'+id)
  }

  updateUserData(id){
    
  }

  getUserById(id){
    return this.http.get(environment.apiUrl+'/api/user/'+id)
  }
  
}
