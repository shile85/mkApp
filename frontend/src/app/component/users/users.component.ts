import { AfterViewInit, Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '/../../../assets/plugins/fontawesome-free/css/all.css',
    '/../../../assets/dist/css/adminlte.css',
    '/../../../assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css',
    '/../../../assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '/../../../assets/plugins/datatables-buttons/css/buttons.bootstrap4.css',

  ]
})
export class UsersComponent implements OnInit, AfterViewInit {

  token:any;
  userData:any;
  username:string;

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.username = this.userData.name;
  }

  ngAfterViewInit(): void{

    $.getScript('/../../assets/plugins/datatables/jquery.dataTables.js');
    $.getScript('/../../assets/plugins/datatables-bs4/js/dataTables.bootstrap4.js');
    $.getScript('/../../assets/plugins/datatables-responsive/js/dataTables.responsive.js');
    $.getScript('/../../assets/plugins/datatables-responsive/js/responsive.bootstrap4.js');
    $.getScript('/../../assets/plugins/datatables-buttons/js/dataTables.buttons.js');
    $.getScript('/../../assets/plugins/datatables-buttons/js/buttons.bootstrap4.js');
    $.getScript('/../../assets/plugins/jszip/jszip.js');
    $.getScript('/../../assets/plugins/pdfmake/pdfmake.js');
    $.getScript('/../../assets/plugins/pdfmake/vfs_fonts.js');
    $.getScript('/../../assets/plugins/datatables-buttons/js/buttons.html5.js');
    $.getScript('/../../assets/plugins/datatables-buttons/js/buttons.print.js');
    $.getScript('/../../assets/plugins/datatables-buttons/js/buttons.colVis.js');

    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    });

  }


}
