import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-paiement-dossier-procedure',
  templateUrl: './paiement-dossier-procedure.component.html',
  styleUrls: ['./paiement-dossier-procedure.component.css']
})
export class PaiementDossierProcedureComponent implements OnInit {

  base_url:string;
  @Input() deviceXs: boolean;
  topVal = 0;

  filteredString ='';

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  lots : any[];
  lotid : number;
  montant_vente: number = 0;
  fournisseurs : any[];

  ventes : any[];


  closeResult : string;

  deleteId : number;

  title = 'Publication ventes';


  num_vente:string;
  statut:string;

  today;

  /*------------------------------------------------*/
  Posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,15,25,50,100,150];
   /*------------------------------------------------*/
  public filter: any = '';

  query: string;

  date_vente: string;
  date_vente_inv: string;

  caisses : any[];

  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private loginService:LoginService){}

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();

    var ladate = new Date();
    this.today = ladate;
    this.statut = "Paiement non effectuer";

    this.getAllCaisse();
       /*-------------------*/
       let jour;
       let mois;

       let cur_date = new Date();

       let dd = cur_date.getDate();
       let mm = cur_date.getMonth() + 1; // Months start at 0!
       let yyyy = cur_date.getFullYear();

       if (dd < 10) {jour = '0' + dd;}else{jour = dd;}
       if (mm < 10) {mois = '0' + mm;}else{mois = mm;}

       this.date_vente = jour + '/' + mois + '/' + yyyy;
       this.date_vente_inv = yyyy + '/' + mois + '/' + jour;
       /*-------------------*/

  }

  getAllCaisse(){
    this.httpclient.get<any>(this.base_url+'/getAllCaisse').subscribe(
      response => {
        //console.log(response);
        this.caisses = response;


      }
    );
  }

/*---------------------------------*/

  onScroll(e) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllCaisse();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCaisse();
  }


}
