import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-tauxglobal',
  templateUrl: './tauxglobal.component.html',
  styleUrls: ['./tauxglobal.component.css']
})
export class TauxglobalComponent implements OnInit {



  base_url :string;

  planitems : any[];


  //localisation = '';
  //searchIntitule = '';
  filteredString ='';



  annee:number;


  @Input() deviceXs: boolean;



   query: string;

   total_exp:number;
   total_inv:number;
   total_finex:number;
   total_global:number;
   /*----*/
   nbr_recep_exp:number = 0;
   nbr_recep_inv:number = 0;
   nbr_recep_finex:number = 0;
   nbr_recep_global:number = 0;

   tx_recep_exp:number = 0;
   tx_recep_inv:number = 0;
   tx_recep_finex:number = 0;
   tx_recep_global:number = 0;
   /****** */
   nbr_lanc_exp:number = 0;
   nbr_lanc_inv:number = 0;
   nbr_lanc_finex:number = 0;
   nbr_lanc_global:number = 0;

   tx_lanc_exp:number = 0;
   tx_lanc_inv:number = 0;
   tx_lanc_finex:number = 0;
   tx_lanc_global:number = 0;

  /*******/
   nbr_recep:number;
   nbr_lanc:number;
   nbr_marche:number;
   tx_recep:number = 0;
   tx_lanc:number = 0;
   tx_marche:number = 0;
  constructor(private httpclient : HttpClient,
    private toastr: ToastrService , private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.nbrTotalLigne();
    this.nbrReception();
    this.nbrLancement();
  }

  nbrTotalLigne(){
    var ladate = new Date();
   // this.annee= ladate.getFullYear();

    this.annee = 2022;
    this.httpclient.get<any>(this.base_url+'/nbrTotalLigne/'+this.annee).subscribe(
      beta => {
        this.total_exp = beta[0]['nbr_total'];
        this.total_inv = beta[2]['nbr_total'];
        this.total_finex = beta[1]['nbr_total'];
        this.total_global =  this.total_exp + this.total_inv + this.total_finex;
      }
    );
  }

  nbrReception(){
    var ladate = new Date();
   // this.annee= ladate.getFullYear();
    this.annee = 2022;
    this.httpclient.get<any>(this.base_url+'/nbrReception/'+this.annee).subscribe(
      sigma => {

        this.nbr_recep_exp = sigma[0]['nbr_recep'];
        this.nbr_recep_inv = sigma[2]['nbr_recep'];
        this.nbr_recep_finex = sigma[1]['nbr_recep'];
        this.nbr_recep_global = this.nbr_recep_exp + this.nbr_recep_inv + this.nbr_recep_finex;

        this.tx_recep_exp  = Math.round(((this.nbr_recep_exp /this.total_exp) * 100) * 100) / 100;
        this.tx_recep_inv  = Math.round(((this.nbr_recep_inv /this.total_inv) * 100) * 100) / 100;
        this.tx_recep_finex = Math.round(((this.nbr_recep_finex /this.total_finex) * 100) * 100) / 100;
        this.tx_recep_global = Math.round(((this.nbr_recep_global / this.total_global) * 100) * 100) / 100;

      }
    );


  }


  nbrLancement(){
    var ladate = new Date();
    //this.annee= ladate.getFullYear();

    this.annee= 2022;
    this.httpclient.get<any>(this.base_url+'/nbrLancement/'+this.annee).subscribe(
      phi => {

        this.nbr_lanc_exp = phi[0]['nbr_lanc'];
        this.nbr_lanc_inv = phi[2]['nbr_lanc'];
        this.nbr_lanc_finex = phi[1]['nbr_lanc'];
        this.nbr_lanc_global = this.nbr_lanc_exp + this.nbr_lanc_inv + this.nbr_lanc_finex;

        this.tx_lanc_exp  = Math.round(((this.nbr_lanc_exp /this.total_exp) * 100) * 100) / 100;
        this.tx_lanc_inv  = Math.round(((this.nbr_lanc_inv /this.total_inv) * 100) * 100) / 100;
        this.tx_lanc_finex = Math.round(((this.nbr_lanc_finex /this.total_finex) * 100) * 100) / 100;
        this.tx_lanc_global = Math.round(((this.nbr_lanc_global / this.total_global) * 100) * 100) / 100;

      }
    );

  }
   //

   nbrPassMarche(){
    var ladate = new Date();
    //this.annee= ladate.getFullYear();

    this.annee= 2022;
    
    this.httpclient.get<any>(this.base_url+'/nbrPassMarche/'+this.annee).subscribe(
      phi => {
        this.nbr_marche = phi[0]['nbr_marche'];

        let w = this.nbr_marche;
        let y = this.total_exp;
        this.tx_marche = Math.round(((w / y) * 100) * 100) / 100;;
      }
    );

  }



}
