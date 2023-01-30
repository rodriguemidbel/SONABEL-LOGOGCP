import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plan } from 'src/app/models/plan.model';
import { Planitem } from 'src/app/models/planitem.model';
import { Mode } from 'src/app/models/mode.model';
import { Budget } from 'src/app/models/budget.model';
import { Type } from '../models/type.model';
import { Localisation } from '../models/localisation.model';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-planitem',
  templateUrl: './planitem.component.html',
  styleUrls: ['./planitem.component.css']
})
export class PlanitemComponent implements OnInit {



  base_url : string;

  planitems : any[];

  listData: MatTableDataSource<any>;

  plans: Plan[];
  budgets: Budget[];
  modes: Mode[];
  types: Type[];
  localisations: Localisation[];
  closeResult : string;
  editForm : FormGroup;
  brandForm : FormGroup;
  annee : number;
  deleteId : number;

  typcredits;
  immobilisations;
  credits;
  agents;


  //localisation = '';
  //searchIntitule = '';
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

   /*--------------*/
   usergroup_id;

   view:number=0;
   add:number=0;
   edit:number=0;
   remove:number=0;
    /*------------------------------------------------*/
    user_id:number;
  agent_id:number;
  agent_name:string;

    cpt:number=0;

    current_date:string;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    //this.getAllPlanitem();
    this.getAllPlan();
    this.getAllBudget();
    this.getAllMode();
    this.getAllType();
    this.getAllLocalisation();

    this.getAllTypcredit();
    this.getAllImmobilisation();
    this.getAllCredit();
    this.getAllAgent();
    this.findLog();

    this.editForm = this.fb.group({
      id: [''],
      num_ordre: [''],
      plan_id: [''],
      budget: [''],
      typcredit: [''],
      immobilisation: [''],
      credit: [''],
      centre_cout: [''],
      projet: [''],
      localisation: [''],
      responsable: [''],
      montant_estime: [''],
      composante: [''],
      montant_dispo: [''],
      designation: [''],
      type: [''],
      mode: [''],
      nbr_lot: [''],
      agent: [''],
      date_tech: [''],
      date_dgcmef: [''],
      date_off: [''],
      temp: [''],
      date_resultat: [''],
      resultat: [''],
      date_visite_site: [''],
      date_demarrage: [''],
      delai_exe: [''],
      date_butoir: [''],
      budget_travaux: [''],
      statut: [''],
      observation: ['']


    } );

    /*---------------*/
    this.brandForm = this.fb.group({
      id: [0],
      user_id: ['', Validators.required],
      action: ['', Validators.required]
    });
    /*---------------*/
    let y = new Date();
    this.current_date = formatDate(y,'dd/MMM/yyyy  h:mm:ss a', 'eng');
  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        this.agent_id = response[0]['agent_id'];
        this.agent_name = response[0]['name'];
        this.user_id = response[0]['user_id'];
        let fonct = 6;

        //console.log('usergroup_id : '+this.usergroup_id+' Fonc : '+fonct);

        if(this.usergroup_id && fonct)
        {
          this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
            beta => {
              //console.log('BETA : ' +beta);
              this.view = beta[0]['view'];
              this.add = beta[0]['add'];
              this.edit = beta[0]['edit'];
              this.remove = beta[0]['remove'];

              //console.log('view : '+beta[0]['view']+'Add : '+beta[0]['add']+' Modif : '+beta[0]['edit']+' remove : '+beta[0]['remove']);
            }
          );
        }
        /*====================*/
        var ladate = new Date();
        //this.annee= ladate.getFullYear();
        this.annee = 2022;
        if(this.usergroup_id == 5)
        {
            if(this.agent_id)
            {
              this.httpclient.get<any>(this.base_url+'/findPlanitemByAgent/'+this.agent_id+'/'+this.annee).subscribe(
                response => {
                  //console.log(response);
                  this.planitems = response;
                  this.cpt = response.length;

                }
              );

            }
            else
            {

            }
        }
        else
        {
          this.httpclient.get<any>(this.base_url+'/getAllPlanitem').subscribe(
            response => {
              //console.log(response);
              this.planitems = response;
              this.cpt = response.length;


            }
          );

        }


      }
    );
  }

  getAllPlanitem(){
    //this.annee = 2022;
    /*var ladate = new Date();
    this.annee= ladate.getFullYear();
    if(this.agent_id){
      this.httpclient.get<any>(this.base_url+'/findPlanitemByAgent/'+this.agent_id+'/'+this.annee).subscribe(
        response => {
          //console.log(response);
          this.planitems = response;
          this.cpt = response.length;

        }
      );

    }
    else
    {
      this.httpclient.get<any>(this.base_url+'/getAllPlanitem').subscribe(
        response => {
          //console.log(response);
          this.planitems = response;
          this.cpt = response.length;


        }
      );
    }*/


  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(f: NgForm) {
    const url = this.base_url+'/createPlanitem';
     /*--------------------------*/
     let designation = f.value['designation'];
     /*--------------------------*/

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal

    /* -----------------*/
     this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Création d\' une ligne de PPM : '+designation+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
     this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
   /* -----------------*/

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
        //console.log(response);
        this.plans = response;

      }
    );
  }

  getAllBudget(){
    this.httpclient.get<any>(this.base_url+'/getAllBudget').subscribe(
      response => {
        //console.log(response);
        this.budgets = response;

      }
    );
  }
  /*---------------------------*/
  getAllTypcredit(){
    this.httpclient.get<any>(this.base_url+'/getAllTypcredit').subscribe(
      response => {
        //console.log(response);
        this.typcredits = response;

      }
    );
  }

  getAllImmobilisation(){
    this.httpclient.get<any>(this.base_url+'/getAllImmobilisation').subscribe(
      response => {
        //console.log(response);
        this.immobilisations = response;

      }
    );
  }

  getAllCredit(){
    this.httpclient.get<any>(this.base_url+'/getAllCredit').subscribe(
      response => {
        //console.log(response);
        this.credits = response;

      }
    );
  }

  getAllAgent(){
    this.httpclient.get<any>(this.base_url+'/getAllAgent').subscribe(
      response => {
        //console.log(response);
        this.agents = response;

      }
    );
  }
  /*-------------*/

  getAllMode(){
    this.httpclient.get<any>(this.base_url+'/getAllMode').subscribe(
      response => {
        //console.log(response);
        this.modes = response;

      }
    );
  }

  getAllType(){
    this.httpclient.get<any>(this.base_url+'/getAllType').subscribe(
      response => {
        //console.log(response);
        this.types = response;

      }
    );
  }

  getAllLocalisation(){
    this.httpclient.get<any>(this.base_url+'/getAllLocalisation').subscribe(
      response => {
        //console.log(response);
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


    document.getElementById('budget').setAttribute('value', planitem.budget.toString());
    document.getElementById('typcredit').setAttribute('value', planitem.typcredit);
    document.getElementById('immobilisation').setAttribute('value', planitem.immobilisation);

    document.getElementById('credit').setAttribute('value', planitem.credit);
    document.getElementById('centre_cout').setAttribute('value', planitem.centre_cout.toString());

    document.getElementById('localisation').setAttribute('value', planitem.localisation);
    document.getElementById('responsable').setAttribute('value', planitem.responsable);
    document.getElementById('montant_estime').setAttribute('value', planitem.montant_estime.toString());

    document.getElementById('montant_dispo').setAttribute('value', planitem.montant_dispo.toString());
    document.getElementById('designation').setAttribute('value', planitem.designation);
    document.getElementById('type').setAttribute('value', planitem.type);
    document.getElementById('mode').setAttribute('value', planitem.mode);
    document.getElementById('nbr_lot').setAttribute('value', planitem.nbr_lot.toString());

    document.getElementById('agent').setAttribute('value', planitem.agent);
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
    document.getElementById('statut').setAttribute('value', planitem.item_statut);
    document.getElementById('observation').setAttribute('value', planitem.observation);

  }

  openEdit(targetModal, planitem: Planitem) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: planitem.id,
      num_ordre: planitem.num_ordre,
      plan_id: planitem.plan_id,
      budget: planitem.budget,
      typcredit: planitem.typcredit,
      immobilisation: planitem.immobilisation,
      credit: planitem.credit,
      centre_cout: planitem.centre_cout,
      projet: planitem.projet,
      localisation:planitem.localisation,
      responsable: planitem.responsable,
      montant_estime: planitem.montant_estime,
      composante: planitem.composante,
      montant_dispo: planitem.montant_dispo,
      designation: planitem.designation,
      type: planitem.type,
      mode: planitem.mode,
      nbr_lot: planitem.nbr_lot,
      agent: planitem.agent,
      date_tech: planitem.date_tech,
      date_dgcmef: planitem.date_dgcmef,
      date_off: planitem.date_off,
      temp: planitem.temp,
      date_resultat: planitem.date_resultat,
      resultat: planitem.resultat,
      date_visite_site: planitem.date_visite_site,
      date_demarrage: planitem.date_demarrage,
      delai_exe: planitem.delai_exe,
      date_butoir: planitem.date_butoir,
      budget_travaux: planitem.budget_travaux,
      statut: planitem.item_statut,
      observation: planitem.observation

    });
  }

  onSave() {
    const editURL = this.base_url+'/updatePlanitem/'+this.editForm.value.id;
    //console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });

    /* -----------------*/
     this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Modification d\' une ligne de PPM : '+this.editForm.value.designation+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
     this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
   /* -----------------*/
  }

  openDelete(targetModal, planitem: Planitem) {
    this.deleteId = planitem.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removePlanitem/'+this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });

    /* -----------------*/
     this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Suppression d\' une ligne de PPM : '+this.deleteId+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
     this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
   /* -----------------*/
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


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }


  openDossier(targetModal, planitem: Planitem) {


    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.planitemID = planitem.id;

    this.intitule_dossier = planitem.designation;

    this.statut = "Valider";

    let year =  new Date().getFullYear();



  }

  dossierSubmit(d: NgForm) {
    const url = this.base_url+'/createDossier';

    d.value['dossier'] = this.filename;

    let num_doss = d.value['numero_doss'];

    this.httpclient.post(url, d.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
       // this.ngOnInit(); //reload the table
             /* -----------------*/
             this.brandForm.patchValue({
              user_id: this.user_id,
              action: 'Création du dossier N° '+num_doss+' par '+this.agent_name
            });
            //console.log(this.brandForm.value);
            this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
              this.ngOnInit();
            });
           /* -----------------*/
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    //console.log("Nom dossier upload : " +this.filename);
    const formData = new FormData();
    formData.append('file', this.images);
    //console.log(formData);
    this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //this.toastr.info("Fichier uploader : "+f.value.json());
    this.modalService.dismissAll(); //dismiss the modal
  }






}
