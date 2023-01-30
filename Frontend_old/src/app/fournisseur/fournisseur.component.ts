import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur } from '../models/fournisseur';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  base_url : string;

  fournisseurs : any[];
  closeResult : string;
  editForm : FormGroup;
  brandForm: FormGroup;
  deleteId : number;

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

   /*--------------*/
   usergroup_id;
   user_id:number;
   agent_id:number;
   agent_name:string;

   view:number=0;
   add:number=0;
   edit:number=0;
   remove:number=0;
   current_date:string;
  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService, private loginService:LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.getFournisseurs();
    this.findLog();
    this.editForm = this.fb.group({
      id: [''],
      nom_four: [''],
      rccm: [''],
      ifu: [''],
      telephone1: [''],
      telephone2: [''],
      adresse:[''],
      email:[''],
      domaine:[''],
      type: ['']
    } );
    /*---------------*/
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
        this.agent_name = response[0]['user_name'];
        this.user_id = response[0]['user_id'];

        let fonct = 4;

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


  getFournisseurs(){
    this.httpclient.get<any>(this.base_url+'/getAllFournisseur').subscribe(
      response => {
        console.log(response);
        this.fournisseurs = response;

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

  onSubmit(f: NgForm) {
    const url = this.base_url+'/createFournisseur';

    /*--------------------------*/
    let nom_four = f.value['nom_four'];
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
      action: 'Création du prestataire '+nom_four+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
     this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
   /* -----------------*/
  }

  openDetails(targetModal, fournisseur: Fournisseur) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   document.getElementById('id_detail').setAttribute('value', fournisseur.id.toString());
   document.getElementById('nom_four_detail').setAttribute('value', fournisseur.nom_four);
   document.getElementById('rccm_detail').setAttribute('value', fournisseur.rccm);
   document.getElementById('ifu_detail').setAttribute('value', fournisseur.ifu);
   document.getElementById('telephone1_detail').setAttribute('value', fournisseur.telephone1);
   document.getElementById('telephone2_detail').setAttribute('value', fournisseur.telephone2);
   document.getElementById('adresse_detail').setAttribute('value', fournisseur.adresse);

   document.getElementById('email_detail').setAttribute('value', fournisseur.email);
   document.getElementById('domaine_detail').setAttribute('value', fournisseur.domaine);

   document.getElementById('type_detail').setAttribute('value', fournisseur.type)

  }

  openEdit(targetModal, fournisseur: Fournisseur) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: fournisseur.id,
      nom_four: fournisseur.nom_four,
      rccm: fournisseur.rccm,
      ifu: fournisseur.ifu,
      telephone1: fournisseur.telephone1,
      telephone2: fournisseur.telephone2,
      adresse: fournisseur.adresse,
      email: fournisseur.email,
      domaine: fournisseur.domaine,
      type: fournisseur.type

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateFournisseur/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Modification du prestataire  '+this.editForm.value.nom_four+' par '+this.agent_name+' | '+this.current_date,
      });

      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

      });
      /*++++++++++*/
  }

  openDelete(targetModal, fournisseur: Fournisseur) {
    this.deleteId = fournisseur.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeFournisseur/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Suppression du prestataire  ID : '+this.deleteId+' par '+this.agent_name+' | '+this.current_date,
      });

      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

      });
      /*++++++++++*/
  }


   /*----******/
   onTableDataChange(event: any){
    this.page = event;
    this.getFournisseurs();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getFournisseurs();
  }




}
