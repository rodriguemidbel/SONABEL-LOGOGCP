import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-marche-execution',
  templateUrl: './marche-execution.component.html',
  styleUrls: ['./marche-execution.component.css']
})
export class MarcheExecutionComponent implements OnInit {
  base_url:string;

  marches : any[];

  query: string;

  annee : number;

   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/

    url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private _fb:FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.getAllMarche();
  }

  getAllMarche(){
    var ladate = new Date();
    this.annee= ladate.getFullYear();
     this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
       response => {
         console.log(response);
         this.marches = response;


       }
     );
   }

    /*----******/
    onTableDataChange(event: any){
      this.page = event;
      this.getAllMarche();

    }

    onTableSizeChange(event: any):void{
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAllMarche();
    }


}
