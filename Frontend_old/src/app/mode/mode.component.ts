import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mode } from '../models/mode.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {
  base_url:string;
  //modes : mode[];
  modes : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;


  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllMode();
    this.editForm = this.fb.group({
      id: [''],
      libelle: ['']
    } );
  }

  getAllMode(){
    this.httpclient.get<any>(this.base_url+'/getAllMode').subscribe(
      response => {
        console.log(response);
        this.modes = response;

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
    const url = this.base_url+'/createMode';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, mode: Mode) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    //document.getElementById('annee_detail').setAttribute('value', mode.annee.toString());
    document.getElementById('lib_detail').setAttribute('value', mode.libelle);

  }

  openEdit(targetModal, mode: Mode) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: mode.id,
      libelle: mode.libelle


    });
  }

  onSave() {
    const editURL = this.base_url+'/updateMode/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, mode: Mode) {
    this.deleteId = mode.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeMode/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
