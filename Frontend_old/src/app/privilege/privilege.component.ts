import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Privilege } from '../models/privilege.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {
  base_url :string;
  //privs : priv[];
  privileges : any[];
  groups :any[];
  fonctionnalites: any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;


  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService , private loginService:LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllPrivilege();
    this.getAllGroup();
    this.getAllFonctionalite();

    this.editForm = this.fb.group({
      id: [''],
      usergroup_id: [''],
      fonctionalite_id: [''],
      view: [''],
      add: [''],
      edit: [''],
      remove: ['']
    } );
  }

  getAllPrivilege(){
    this.httpclient.get<any>(this.base_url+'/getAllPrivilege').subscribe(
      response => {
        console.log(response);
        this.privileges = response;

      }
    );
  }

  getAllGroup(){
    this.httpclient.get<any>(this.base_url+'/getAllGroup').subscribe(
      response => {
        //console.log(response);
        this.groups = response;

      }
    );
  }

  getAllFonctionalite(){
    this.httpclient.get<any>(this.base_url+'/getAllFonctionalite').subscribe(
      response => {
        //console.log(response);
        this.fonctionnalites = response;

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
    const url = this.base_url+'/createPrivilege';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, priv: Privilege) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    document.getElementById('usergroup_detail').setAttribute('value', priv.usergroup_id.toString());
    document.getElementById('fonctionalite_detail').setAttribute('value', priv.fonctionalite_id.toString());
    document.getElementById('view_detail').setAttribute('value', priv.view.toString());
    document.getElementById('add_detail').setAttribute('value', priv.add.toString());
    document.getElementById('edit_detail').setAttribute('value', priv.edit.toString());
    document.getElementById('remove_detail').setAttribute('value', priv.remove.toString());

  }

  openEdit(targetModal, priv: Privilege) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: priv.id,
      usergroup_id: priv.usergroup_id,
      fonctionalite_id: priv.fonctionalite_id,
      view: priv.view,
      add: priv.add,
      edit: priv.edit,
      remove: priv.remove
    });
  }

  onSave() {
    console.log(this.editForm.value);
    const editURL = this.base_url+'/updatePrivilege/' + this.editForm.value.id;

    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, priv: Privilege) {
    this.deleteId = priv.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removePrivilege/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
