import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dossier } from '../models/dossier.model';
import { Dossiertech } from '../models/dossiertech.model';
import { LoginService } from '../services/login.service';

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
  isSubmitted = false;

  images;

  dossier: string;
   /*------------------------*/
     pageIndex:number = 0;
     pageSize:number = 5;
     lowValue:number = 0;
     highValue:number = 5;

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
