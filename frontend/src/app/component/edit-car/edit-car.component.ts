import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Car } from 'src/app/models/car.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: [
    './edit-car.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.min.css',
    '/../../../assets/dist/css/adminlte.min.css'
  ]
})
export class EditCarComponent implements OnInit {

  token:any;
  userData:any;
  userId:string;
  roleId:string;
  car = new Car();
  form:FormGroup;
  imageForm:FormGroup;
  imageData:any;
  documentForm:FormGroup;
  documentData:any;
  submitted = false;
  data:any;
  files:any;
  documents:any;
  carId:any;
  carData: any;
  users:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      model: [null],
      registration: [null],
      user_id: [null],
    });
  }

  createFormImage(){
    this.imageForm = this.formBuilder.group({
      image: [null, Validators.required]
    })
  }

  createFormDocument(){
    this.documentForm = this.formBuilder.group({
      document : [null, Validators.required]
    })
  }

  ngOnInit(): void {

    this.createForm();
    this.createFormImage();
    this.createFormDocument();

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userId = this.userData.userId;
    this.roleId = this.userData.roleId;

    if(this.route.snapshot.queryParamMap.get('id')){
      this.carId = this.route.snapshot.queryParamMap.get('id');
    }
    
    this.getData();
    this.getUsers();
  }

  ngAfterViewInit(){
    this.getData();
  }

  get f(){
    return this.form.controls;
  }

  get fImage(){
    return this.imageForm.controls;
  }

  get fDocument(){
    return this.documentForm.controls;
  }

  getData(){
    this.dataService.getCarById(this.carId).subscribe(res => {
      this.carData = res;
      this.car = this.carData;
    });
   }

   updateCarData(){
    this.submitted = true;
    this.dataService.updateCarData(this.carId, this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili podatke vozila', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
      }
      
      
    })
  }

  uploadImage(event){
    this.files = event.target.files[0];
  }

  submitUploadImage(){
    console.log(this.carId);
    this.submitted = true;
    if(this.imageForm.invalid){
      return;
    }
    const formData = new FormData();
    formData.append("image", this.files, this.files.name);

    this.dataService.uploadCarImage(this.carId, formData).subscribe(res=>{
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste izmenili fotografiju vozila', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
        this.ngAfterViewInit();
      }else{
        this.toastr.error('Dokument mora biti u jpg, bmp ili png formatu', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
      }
    })
    

  }

  uploadDocument(event){
    this.documents = event.target.files[0];
  }

  submitUploadDocument(){
    this.submitted = true;
    if(this.documentForm.invalid){
      return;
    }
    
    const formDocumentData = new FormData();
    formDocumentData.append("document", this.documents, this.documents.name);
    this.dataService.uploadCarDocument(this.carId, formDocumentData).subscribe(res=>{
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success('Uspešno ste dodali dokument', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
        
      }else{
        this.toastr.error('Došlo je do greške, molimo pokušajte ponovo', '', {
          timeOut: 2000,
          progressBar: true
        });
        this.submitted = false;
      }
    })
    
  }

  getUsers(){
    this.dataService.getActiveUsers().subscribe(res => {
      this.users = res;
    });
  }

}
