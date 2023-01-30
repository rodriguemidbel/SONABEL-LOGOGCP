import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Caisse } from '../models/caisse.model';
import { Vente } from '../models/vente.model';
import { LoginService } from '../services/login.service';
import { sprintf } from 'sprintf-js';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  base_url : string;

  modepaies : any[]
  caisses : any[];
  ventes : any[];

  closeResult : string;
  editForm : FormGroup;

  venteId : number;

  numRecu: string;

  deleteId : number;

  caisseId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  isSubmitted = false;

  /*------------------------------------------------*/
  Posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,15,25,50,100,150];
   /*------------------------------------------------*/
  public filter: any = '';

  query: string;

  date_caisse: string;
  date_caisse_inv: string;

  today: string;

   /*------------------------------------------------*/
   caisseSubsciption: Subscription;
   /*------------------------------------------------*/

   /*--------------*/
   usergroup_id;
   user_id:number;
   agent_id:number;
   agent_name:string;

   view:number=0;
   add:number=0;
   edit:number=0;
   remove:number=0;
    /*------------------------------------------------*/

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.getAllVentes();
    this.getAllModepaies();
    this.findLog();

    this.numCaisse();
    this.editForm = this.fb.group({
      id: [''],
      statut: ['']
    } );

     /*-------------------*/
     let jour;
     let mois;

     let cur_date = new Date();

     let dd = cur_date.getDate();
     let mm = cur_date.getMonth() + 1; // Months start at 0!
     let yyyy = cur_date.getFullYear();

     if (dd < 10) {jour = '0' + dd;}else{jour = dd;}
     if (mm < 10) {mois = '0' + mm;}else{mois = mm;}

     this.date_caisse = jour + '/' + mois + '/' + yyyy;
     this.date_caisse_inv = yyyy + '/' + mois + '/' + jour;
     /*-------------------*/

  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        let fonct = 9;

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

        //this.count = response.length;

      }
    );
  }




  getAllVentes(){
    this.httpclient.get<any>(this.base_url+'/getAllVente').subscribe(
      response => {
        //console.log(response);
        this.ventes = response;


      }
    );
  }

  openEdit(targetModal, vente: Vente) {
    this.venteId = vente.id;

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });

  }

  numCaisse() {
    /*let year =  new Date().getFullYear();
    var seq = Math.floor(100000 + Math.random() * 900000).toString();
    this.numRecu =   seq.toString();*/

    let year =  2022;
    this.httpclient.get<any>(this.base_url+'/countCaisses/'+year).subscribe(
    response => {
      //console.log(response);
      let nbr = response[0]['nbr'];
      this.numRecu =  sprintf('%05d', nbr);
    }
  );
  }

  imprimerRecu(vente_id){
    this.venteId = vente_id;
    this.findCaisse();
  }

  findCaisse(){
    this.httpclient.get<any>(this.base_url+'/findCaisse/'+this.venteId).subscribe(
      response => {
        //console.log(response);
        this.caisses = response;


      }
    );
  }

  onSubmit(f: NgForm) {
    const url = this.base_url+'/createCaisse';

    /*--------------------------*/
   let num_vente = f.value['date_recu'];
   /*--------------------------*/

    f.value['date_recu'] = this.date_caisse_inv;
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        //this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal

    /*--------------Mise a jour vente------------------*/
    this.editForm.patchValue( {
      id: f.value.vente_id,
      statut: "Payé"

    });
    /*=======*/
    const editURL = this.base_url+'/updateVente/'+this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.toastr.success("Enregistrement effectuer avec succés");
        this.modalService.dismissAll();
    });
}


  getAllModepaies(){
    this.httpclient.get<any>(this.base_url+'/getAllModepaie').subscribe(
      response => {
        console.log(response);
        this.modepaies = response;


      }
    );
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


  openDelete(targetModal, caisse: Caisse) {
    this.deleteId = caisse.id;
    this.venteId = caisse.vente_id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeCaisse/'+this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
      });
       /*--------------Mise a jour vente------------------*/
        this.editForm.patchValue( {
          id: this.venteId,
          statut: "Non payé"

        });
        /*=======*/
        const editURL = this.base_url+'/updateVente/'+this.editForm.value.id;
        console.log(this.editForm.value);
        this.httpclient.patch(editURL, this.editForm.value)
          .subscribe((results) => {
            this.ngOnInit();
            this.toastr.warning("Suppression effectuer avec succés");
            this.modalService.dismissAll();
        });
  }

  openDetails(targetModal, vente: Vente) {
    this.venteId = vente.id;
    this.findCaisse();
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });


  }

 /*
  onSave() {
    const editURL = 'http://localhost:3000/updateCaisse/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }


 */
  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllVentes();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllVentes();
  }



}
