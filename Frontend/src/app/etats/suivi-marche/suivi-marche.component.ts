import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-suivi-marche',
  templateUrl: './suivi-marche.component.html',
  styleUrls: ['./suivi-marche.component.css']
})
export class SuiviMarcheComponent implements OnInit {
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

    marches : any[];

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
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        console.log(response);
        this.marches = response;

        //$scope.displaydash.dossiers = response.data;
      let alpha = response[0]['date_trans_dgcmef'];
      let beta = response[0]['date_notif'];
      /*++++++*/
     // To set two dates to two variables
     let date1 = new Date(alpha);
     let date2 = new Date(beta);

       let Time = date2.getTime() - date1.getTime();
      // this.days = alpha+'  '+beta; //Diference in Days
      //this.days = Time / (1000 * 3600 * 24); //Diference in Days OK
     /*++++++*/

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
