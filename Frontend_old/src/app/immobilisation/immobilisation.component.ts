import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Immobilisation } from '../models/immobilisation.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-immobilisation',
  templateUrl: './immobilisation.component.html',
  styleUrls: ['./immobilisation.component.css']
})
export class ImmobilisationComponent implements OnInit {

  base_url : string;

  immobilisations : any[];
closeResult : string;
editForm : FormGroup;
deleteId : number;


constructor(private httpclient : HttpClient,
            private modalService: NgbModal,
            private fb: FormBuilder,
            private toastr: ToastrService, private loginService:LoginService) {}

ngOnInit(): void {

  this.base_url = this.loginService.base_url();
  this.getAllimmo();
  this.editForm = this.fb.group({
    id: [''],
    libelle: ['']
  } );
}

getAllimmo(){
  this.httpclient.get<any>(this.base_url+'/getAllImmobilisation').subscribe(
    response => {
      console.log(response);
      this.immobilisations = response;

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
  const url = this.base_url+'/createImmobilisation';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.toastr.success("Enregistrement effectuer avec succés");
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

openDetails(targetModal, immo: Immobilisation) {
  this.modalService.open(targetModal, {
  centered: true,
  backdrop: 'static',
  size: 'lg'
});
  document.getElementById('id_detail').setAttribute('value', immo.id.toString());
  document.getElementById('libelle_detail').setAttribute('value', immo.libelle);

}

openEdit(targetModal, immo: Immobilisation) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: immo.id,
    libelle: immo.libelle


  });
}

onSave() {
  const editURL = this.base_url+'/updateImmobilisation/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.toastr.warning("Modification effectuer avec succés");
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, immo: Immobilisation) {
  this.deleteId = immo.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeImmobilisation/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

}
