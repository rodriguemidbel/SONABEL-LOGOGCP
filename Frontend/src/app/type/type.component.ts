import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/type.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  base_url : string;
  //plans : Plan[];
  types : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private loginService:LoginService ) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getTypes();
    this.editForm = this.fb.group({
      id: [''],
      libelle: ['']
    } );
  }


  getTypes(){
    this.httpclient.get<any>(this.base_url+'/getAllType').subscribe(
      response => {
        console.log(response);
        this.types = response;

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
    const url = this.base_url+'/createType';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, type: Type) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id_detail').setAttribute('value', type.id.toString());
    document.getElementById('libelle_detail').setAttribute('value', type.libelle);

  }

  openEdit(targetModal, type: Type) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: type.id,
      libelle: type.libelle

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateType/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, type: Type) {
    this.deleteId = type.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeType/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }



}
