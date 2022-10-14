import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-traitementdossier',
  templateUrl: './traitementdossier.component.html',
  styleUrls: ['./traitementdossier.component.css']
})
export class TraitementdossierComponent implements OnInit {
  base_url :string;
  dossiers : any[];

  title = 'Marche';
  mediaSub: Subscription;
  annee : number;

  marches : any[];
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;

   url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

   filename: string;
   images;

   date_vente: string;
   days;

   constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.getAllDossier();
  }

  getAllDossier(){
    var ladate = new Date();
    this.annee= ladate.getFullYear();
     this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
       response => {
         //console.log(response);
         this.dossiers = response;

         /*for(let i = 0; i < response.length; i++)
         {

              /-$scope.displaydash.dossiers = response.data;
              let alpha = response[i]['date_trans_dgcmef'];
              let beta = response[i]['date_notif'];

              /-To set two dates to two variables
               let date1 = new Date(alpha);
               let date2 = new Date(beta);

              let Time = date2.getTime() - date1.getTime();
              // this.days = alpha+'  '+beta; //Diference in Days
              this.days = Time / (1000 * 3600 * 24); //Diference in Days OK

              response[i]['days'] = this.days;


         }*/

       }
     );
   }

  /*---------------------------------*/
  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/findMarche/1').subscribe(
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
      this.days = Time / (1000 * 3600 * 24); //Diference in Days OK
     /*++++++*/

      }
    );
  }

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
