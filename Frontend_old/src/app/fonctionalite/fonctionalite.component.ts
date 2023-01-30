import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fonctionalite } from '../models/fonctionalite.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-fonctionalite',
  templateUrl: './fonctionalite.component.html',
  styleUrls: ['./fonctionalite.component.css']
})
export class FonctionaliteComponent implements OnInit {

  base_url : string;


//foncs : fonc[];
fonctionalites : any[];
closeResult : string;
editForm : FormGroup;
deleteId : number;


constructor(private httpclient : HttpClient,
            private modalService: NgbModal,
            private fb: FormBuilder,
            private toastr: ToastrService, private loginService:LoginService) {}

ngOnInit(): void {

  this.base_url = this.loginService.base_url();
  this.getAllFonctionalite();
  this.editForm = this.fb.group({
    id: [''],
    libelle: [''],
    description: ['']
  } );
}

getAllFonctionalite(){
  this.httpclient.get<any>( this.base_url+'/getAllFonctionalite').subscribe(
    response => {
      console.log(response);
      this.fonctionalites = response;

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
  const url =  this.base_url+'/createFonctionalite';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.toastr.success("Enregistrement effectuer avec succés");
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

openDetails(targetModal, fonc: Fonctionalite) {
  this.modalService.open(targetModal, {
  centered: true,
  backdrop: 'static',
  size: 'lg'
});
  document.getElementById('id_detail').setAttribute('value', fonc.id.toString());
  document.getElementById('libelle_detail').setAttribute('value', fonc.libelle);
  document.getElementById('description_detail').setAttribute('value', fonc.description);

}

openEdit(targetModal, fonc: Fonctionalite) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: fonc.id,
    libelle: fonc.libelle,
    symbole: fonc.description

  });
}

onSave() {
  const editURL =  this.base_url+'/updateFonctionalite/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.toastr.warning("Modification effectuer avec succés");
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, fonc: Fonctionalite) {
  this.deleteId = fonc.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL =  this.base_url+'/removeFonctionalite/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}


}
