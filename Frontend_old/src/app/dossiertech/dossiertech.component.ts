import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dossier } from '../models/dossier.model';
import { Dossiertech } from '../models/dossiertech.model';
import { LoginService } from '../services/login.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dossiertech',
  templateUrl: './dossiertech.component.html',
  styleUrls: ['./dossiertech.component.css']
})
export class DossiertechComponent implements OnInit {

  base_url :string;
  planitems : any[]
  dossiertechs : any[];


  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  dossierId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  planitemForm:FormGroup;
  isSubmitted = false;

  images;

  dossier: string;
   /*------------------------*/
     pageIndex:number = 0;
     pageSize:number = 5;
     lowValue:number = 0;
     highValue:number = 5;

     usergroup_id;
     user_id:number;
     agent_id:number;
     agent_name:string;

     current_date:string;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllPlanitems();
    this.getAllDossiertech();

    this.editForm = this.fb.group({
      id: [''],
      planitem_id: [''],
      date_tech_reel: [''],
      service: ['']

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

  /*---------------*/
  this.planitemForm = this.fb.group({
    id: [0],
    date_tech_reel: ['', Validators.required]
  });
  /*---------------*/

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.dossier = file.filename;
    }
  }

  getAllDossiertech(){
    this.annee = 2022;
    this.httpclient.get<any>(this.base_url+'/findDossiertech/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.dossiertechs = response;


      }
    );
  }

  getAllPlanitems(){
    this.annee = 2022;
    this.httpclient.get<any>('http://localhost:3000/findPlanitem/'+this.annee).subscribe(
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

  onSubmit(f: NgForm) {
    const url = 'http://localhost:3000/createDossiertech';

    let planitem_id = f.value['date_tech_reel'];

    let date_tech_reel = f.value['date_tech_reel'];

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    console.log("Nom dossier upload : " +this.dossier);
    const formData = new FormData();
    formData.append('file', this.images);
    //console.log(formData);
    this.httpclient.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //this.toastr.info("Fichier uploader : "+f.value.json());
    this.modalService.dismissAll(); //dismiss the modal

    /* -------Mis a jour de la table Historique des actions----------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Enregistrement d\'un dossier technique par '+this.agent_name+' | '+this.current_date
    });
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
    });
    /* -----------------*/

    /* --------Mis a jour de la date de reception dossier technique réel dans la table planitems---------*/
    this.planitemForm.patchValue({
      id: planitem_id,
      date_tech_reel: date_tech_reel
    });
    this.httpclient.patch(this.base_url+'/updatePlanitem/'+this.planitemForm.value.id, this.planitemForm.value).subscribe(() => {
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



  openDetails(targetModal, dossier: Dossiertech) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('detail_id').setAttribute('value', dossier.dossiertechID.toString());
    document.getElementById('date_tech_reel_detail').setAttribute('value', dossier.date_tech_reel);
    document.getElementById('service_detail').setAttribute('value', dossier.service);
    document.getElementById('planitem_detail').setAttribute('value', dossier.planitem_id.toString());

  }

  openEdit(targetModal, dossier: Dossiertech) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: dossier.dossiertechID,
      planitem_id: dossier.planitem_id,
      date_tech_reel: dossier.date_tech_reel,
      service: dossier.service

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateDossiertech/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
    /* -------Mis a jour de la table Historique des actions----------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Modification d\'un dossier technique par '+this.agent_name+' | '+this.current_date
    });
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
    });
    /* -----------------*/
  }

  openDelete(targetModal, dossier: Dossiertech) {
    this.deleteId = dossier.dossiertechID;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeDossiertech/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
       /* -------Mis a jour de la table Historique des actions----------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Suppression d\'un dossier technique par '+this.agent_name+' | '+this.current_date
    });
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
    });
    /* -----------------*/
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



}
