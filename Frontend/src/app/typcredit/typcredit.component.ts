import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Typcredit } from '../models/typcredit.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-typcredit',
  templateUrl: './typcredit.component.html',
  styleUrls: ['./typcredit.component.css']
})
export class TypcreditComponent implements OnInit {

  base_url :string;
  typcredits : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;


  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService , private loginService:LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllBudget();
    this.editForm = this.fb.group({
      id: [''],
      libelle: ['']
    } );
  }

  getAllBudget(){
    this.httpclient.get<any>(this.base_url+'/getAllTypcredit').subscribe(
      response => {
        console.log(response);
        this.typcredits = response;

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
    const url = this.base_url+'/createTypcredit';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, typcredit: Typcredit) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    document.getElementById('id_detail').setAttribute('value', typcredit.id.toString());
    document.getElementById('libelle_detail').setAttribute('value', typcredit.libelle);

  }

  openEdit(targetModal, typcredit: Typcredit) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: typcredit.id,
      libelle: typcredit.libelle


    });
  }

  onSave() {
    const editURL = this.base_url+'/updateTypcredit/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.toastr.warning("Modification effectuer avec succés");
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, typcredit: Typcredit) {
    this.deleteId = typcredit.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeTypcredit/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
