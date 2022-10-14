import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Localisation } from '../models/localisation.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements OnInit {

  base_url : string;

   //localisations : localisation[];
   localisations : any[];
   closeResult : string;
   editForm : FormGroup;
   deleteId : number;

   @Input() deviceXs: boolean;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getlocalisations();
    this.editForm = this.fb.group({
      id: [''],
      sigle: [''],
      libelle: ['']
    } );
  }


  getlocalisations(){
    this.httpclient.get<any>(this.base_url+'/getAllLocalisation').subscribe(
      response => {
        console.log(response);
        this.localisations = response;

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
    const url = this.base_url+'/createLocalisation';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, localisation: Localisation) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   document.getElementById('id_detail').setAttribute('value', localisation.id.toString());
   document.getElementById('sigle_detail').setAttribute('value', localisation.sigle);
   document.getElementById('libelle_detail').setAttribute('value', localisation.libelle);

  }

  openEdit(targetModal, localisation: Localisation) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: localisation.id,
      sigle: localisation.sigle,
      libelle: localisation.libelle

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateLocalisation/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }

  openDelete(targetModal, localisation: Localisation) {
    this.deleteId = localisation.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeLocalisation/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }



}
