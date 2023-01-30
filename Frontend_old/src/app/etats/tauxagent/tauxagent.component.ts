import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tauxagent',
  templateUrl: './tauxagent.component.html',
  styleUrls: ['./tauxagent.component.css']
})
export class TauxagentComponent implements OnInit {



  base_url :string;

  planitems : any[];


  annee;

  plans: any[];
  agents: [];
  localisations: any[];
  modes: [];
  u:number =0;
  v:number = 0;

  tx_lanc:number = 0;

  filteredString ='';

  progress:number = 75;

  @Input() deviceXs: boolean;

   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;

   /*---Dossier----*/
   images;

  dossier: string;
  filename: string;
  planitemID:number;
  statut: string;
  num_dossier:string;
  intitule_dossier: string;

  nbr_dossier;
  alphas :any = [];

  betas :any = [];

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService , private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllPlanitem();
    this.getAllPlan();
    this.nbrLigneLocaLance();
    this.nbrLigneLocaDosstech();
  }

  getAllPlanitem(){
    var ladate = new Date();
    //this.annee= ladate.getFullYear();
    this.annee= 2022;
    this.httpclient.get<any>(this.base_url+'/nbrLigneAgent/'+this.annee).subscribe(
      response => {
        this.planitems = response;
      }
    );
  }

  nbrLigneLocaDosstech(){

    var ladate = new Date();
    //this.annee= ladate.getFullYear();
    this.annee= 2022;
    this.httpclient.get<any>(this.base_url+'/nbrLigneAgentDosstech/'+this.annee).subscribe(
      response => {
        this.betas = response;
      }
    );
  }

  nbrLigneLocaLance(){
    var ladate = new Date();
    //this.annee= ladate.getFullYear();
    this.annee= 2022;
    this.httpclient.get<any>(this.base_url+'/nbrLigneAgentLance/'+this.annee).subscribe(
      response => {
        this.alphas = response;
      }
    );
  }

  getAllPlan(){
    this.httpclient.get<any>(this.base_url+'/getAllPlan').subscribe(
      response => {
        console.log(response);
        this.plans = response;

      }
    );
  }


  getAllAgent(){
    this.httpclient.get<any>(this.base_url+'/getAllAgent').subscribe(
      response => {
        console.log(response);
        this.agents = response;

      }
    );
  }


  getAllMode(){
    this.httpclient.get<any>(this.base_url+'/getAllMode').subscribe(
      response => {
        console.log(response);
        this.modes = response;

      }
    );
  }


  getAllLocalisation(){
    this.httpclient.get<any>(this.base_url+'/getAllLocalisation').subscribe(
      response => {
        console.log(response);
        this.localisations = response;

      }
    );
  }



  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllPlanitem();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllPlanitem();
  }


  /*-------Dossiers-------------------*/





}
