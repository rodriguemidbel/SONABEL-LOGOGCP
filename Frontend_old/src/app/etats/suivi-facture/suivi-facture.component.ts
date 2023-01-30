import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-suivi-facture',
  templateUrl: './suivi-facture.component.html',
  styleUrls: ['./suivi-facture.component.css']
})
export class SuiviFactureComponent implements OnInit {
  base_url:string;

  dossiers : any[];

  query: string;

  annee : number;

   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
    paiements : any[]
    url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private _fb:FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.getAllpaiement();
  }

  getAllpaiement(){
    this.httpclient.get<any>(this.base_url+'/getAllPaiement').subscribe(
   response => {
     console.log(response);
     this.paiements = response;


   }
 );
}

    /*----******/
    onTableDataChange(event: any){
      this.page = event;
      this.getAllpaiement();

    }

    onTableSizeChange(event: any):void{
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAllpaiement();
    }

}
