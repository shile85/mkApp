import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {
    constructor(
        private router:Router,
        private toastr: ToastrService, 
        ){

    }

    token:any;
    roleId:any;
    userData:any;

    getRoleId(){
        this.token = localStorage.getItem('token');
        if(this.token){
            this.token = localStorage.getItem('token');
            this.userData = jwt_decode(this.token);
            this.roleId = this.userData.roleId;
            return this.roleId;
        } else{
            this.router.navigate(['']);
        }
        
    }
    

    canActivate(){
        switch(this.getRoleId()){
            case 1 :
            case 2 :{
                return true;
                break;
              }
            default:{
                this.toastr.error("Pristup zabranjen. Kontaktirajte vašeg administratora.", '', {
                    timeOut: 3000,
                    progressBar: true
                  });
                this.router.navigate(['home'])
            }
          }
    }
}