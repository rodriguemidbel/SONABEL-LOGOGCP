import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Planitem } from '../models/planitem.model';
import { Plan } from 'src/app/models/plan.model';
import { Mode } from 'src/app/models/mode.model';
import { Budget } from 'src/app/models/budget.model';
import { Type } from '../models/type.model';
import { Localisation } from '../models/localisation.model';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-planitemexe',
  templateUrl: './planitemexe.component.html',
  styleUrls: ['./planitemexe.component.css']
})
export class PlanitemexeComponent implements OnInit {

  base_url:string;

  planitems : any[];

  listData: MatTableDataSource<any>;

  plans: Plan[];
  budgets: Budget[];
  modes: Mode[];
  types: Type[];
  localisations: Localisation[];
  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  typcredits;
  immobilisations;
  credits;
  agents;


   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;


  @Input() deviceXs: boolean;

   /*------------------------*/
   pageIndex:number = 0;
   pageSize:number = 5;
     lowValue:number = 0;
     highValue:number = 5;
   /*------------------------*/
   /*------------------------------------------------*/

   displayedColumns: string[] = ['id', 'annee', 'montant_estime', 'designation', 'mode', 'delai_exe', 'type','localisation', 'action(s)'];
   planitemSubsciption: Subscription;
   /*------------------------------------------------*/
  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllPlanitem();
    this.getAllPlan();
    this.getAllBudget();
    this.getAllMode();
    this.getAllType();
    this.getAllLocalisation();

    this.getAllTypcredit();
    this.getAllImmobilisation();
    this.getAllCredit();
    this.getAllAgent();

    this.editForm = this.fb.group({
      id: [''],
      planID: [''],
      designation: [''],
      date_dgcmef_reel: [''],
      date_off_reel: [''],
      temp_reel: [''],
      date_reel_demarrage: [''],
      delai_reel_exe: [''],
      date_reel_fin: ['']



    } );

  }

  getAllPlanitem(){
    this.annee = 2022;
    this.httpclient.get<any>(this.base_url+'/findPlanitem/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.planitems = response;


      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAllPlan(){
    this.httpclient.get<any>(this.base_url+'/getAllPlan').subscribe(
      response => {
        console.log(response);
        this.plans = response;

      }
    );
  }

  getAllBudget(){
    this.httpclient.get<any>(this.base_url+'/getAllBudget').subscribe(
      response => {
        console.log(response);
        this.budgets = response;

      }
    );
  }
  /*---------------------------*/
  getAllTypcredit(){
    this.httpclient.get<any>(this.base_url+'/getAllTypcredit').subscribe(
      response => {
        console.log(response);
        this.typcredits = response;

      }
    );
  }

  getAllImmobilisation(){
    this.httpclient.get<any>(this.base_url+'/getAllImmobilisation').subscribe(
      response => {
        console.log(response);
        this.immobilisations = response;

      }
    );
  }

  getAllCredit(){
    this.httpclient.get<any>(this.base_url+'/getAllCredit').subscribe(
      response => {
        console.log(response);
        this.credits = response;

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
  /*-------------*/

  getAllMode(){
    this.httpclient.get<any>(this.base_url+'/getAllMode').subscribe(
      response => {
        console.log(response);
        this.modes = response;

      }
    );
  }

  getAllType(){
    this.httpclient.get<any>(this.base_url+'/getAllType').subscribe(
      response => {
        console.log(response);
        this.types = response;

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

  openDetails(targetModal, planitem: Planitem) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('planitemID').setAttribute('value', planitem.id.toString());
    document.getElementById('annee').setAttribute('value', planitem.annee.toString());
    document.getElementById('budget').setAttribute('value', planitem.budget);
    document.getElementById('typcredit').setAttribute('value', planitem.typcredit);
    document.getElementById('immobilisation').setAttribute('value', planitem.immobilisation);

    document.getElementById('credit').setAttribute('value', planitem.credit);
    document.getElementById('centre_cout').setAttribute('value', planitem.centre_cout.toString());
    document.getElementById('localisation').setAttribute('value', planitem.localisation);
    document.getElementById('responsable').setAttribute('value', planitem.responsable);
    document.getElementById('montant_estime').setAttribute('value', planitem.montant_estime.toString());

    document.getElementById('montant_dispo').setAttribute('value', planitem.montant_dispo.toString());
    document.getElementById('designation').setAttribute('value', planitem.designation);
    document.getElementById('type').setAttribute('value', planitem.type.toString());
    document.getElementById('mode').setAttribute('value', planitem.mode);
    document.getElementById('nbr_lot').setAttribute('value', planitem.nbr_lot.toString());

    document.getElementById('agent').setAttribute('value', planitem.agent_id.toString());
    document.getElementById('date_tech').setAttribute('value', planitem.date_tech);
    document.getElementById('date_dgcmef').setAttribute('value', planitem.date_dgcmef);
    document.getElementById('date_off').setAttribute('value', planitem.date_off);
    document.getElementById('temp').setAttribute('value', planitem.temp.toString());

    document.getElementById('date_resultat').setAttribute('value', planitem.date_resultat);
    document.getElementById('resultat').setAttribute('value', planitem.resultat);
    document.getElementById('date_visite_site').setAttribute('value', planitem.date_visite_site);
    document.getElementById('date_demarrage').setAttribute('value', planitem.date_demarrage);
    document.getElementById('delai_exe').setAttribute('value', planitem.delai_exe.toString());

    document.getElementById('date_butoir').setAttribute('value', planitem.date_butoir);
    document.getElementById('budget_travaux').setAttribute('value', planitem.budget_travaux.toString());
    document.getElementById('observation').setAttribute('value', planitem.observation);

  }

  openEdit(targetModal, planitem: Planitem) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: planitem.id,
      plan_id: planitem.plan_id,
      designation: planitem.designation,
      date_dgcmef_reel: planitem.date_dgcmef_reel,
      date_off_reel: planitem.date_off_reel,
      temp_reel: planitem.temp_reel,
      date_reel_demarrage: planitem.date_reel_demarrage,
      delai_reel_exe: planitem.delai_reel_exe,
      date_reel_fin: planitem.date_reel_fin
    });
  }

  onSave() {
    const editURL = this.base_url+'/updatePlanitem/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }



  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }
      this.pageIndex = event.pageIndex;
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



}
