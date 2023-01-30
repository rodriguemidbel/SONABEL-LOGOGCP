import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dossier-agent',
  templateUrl: './dossier-agent.component.html',
  styleUrls: ['./dossier-agent.component.css']
})
export class DossierAgentComponent implements OnInit {
  base_url:string;

  dossiers : any[];
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
    this.getAllDossier();
    this.marcheGroupByDoss();
  }

  getAllDossier(){
    var ladate = new Date();
    this.annee= ladate.getFullYear();
     this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
       response => {
         console.log(response);
         this.dossiers = response;


       }
     );
   }
   // marcheGroupByDoss
   marcheGroupByDoss(){
    var ladate = new Date();

     this.httpclient.get<any>(this.base_url+'/marcheGroupByDoss').subscribe(
       response => {
         console.log(response);
         this.marches = response;


       }
     );
   }

    /*----******/
    onTableDataChange(event: any){
      this.page = event;
      this.getAllDossier();

    }

    onTableSizeChange(event: any):void{
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAllDossier();
    }

}
