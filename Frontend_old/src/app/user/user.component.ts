import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  base_url :string;
  //users : user[];
  users : any[];
  groups :any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

   /*--------------*/
   usergroup_id;

   view:number=0;
   add:number=0;
   edit:number=0;
   remove:number=0;


  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService , private loginService:LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllUser();
    this.getAllGroup();
    this.findLog();

    this.editForm = this.fb.group({
      id: [''],
      usergroup_id: [''],
      name: [''],
      username: [''],
      password: [''],
      telephone: [''],
      email: [''],
      adresse: [''],
      statut: [''],
    } );
  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        let fonct = 1;

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

  getAllUser(){
    this.httpclient.get<any>(this.base_url+'/getAllUser').subscribe(
      response => {
        console.log(response);
        this.users = response;

      }
    );
  }

  getAllGroup(){
    this.httpclient.get<any>(this.base_url+'/getAllGroup').subscribe(
      response => {
        console.log(response);
        this.groups = response;

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
    const url = this.base_url+'/createUser';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, user: User) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    document.getElementById('usergroupid_detail').setAttribute('value', user.usergroup_id.toString());
    document.getElementById('name_detail').setAttribute('value', user.name);
    document.getElementById('username_detail').setAttribute('value', user.username.toString());
    document.getElementById('password_detail').setAttribute('value', user.email);
    document.getElementById('telephone_detail').setAttribute('value', user.telephone);
    document.getElementById('email_detail').setAttribute('value', user.email);
    document.getElementById('adresse_detail').setAttribute('value', user.adresse);
    document.getElementById('statut_detail').setAttribute('value', user.statut.toString());

  }

  openEdit(targetModal, user: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: user.id,
      usergroup_id: user.usergroup_id,
      name: user.name,
      username: user.username,
      password: user.password,
      telephone: user.telephone,
      email: user.email,
      adresse: user.adresse,
      statut: user.statut,


    });
  }

  onSave() {
    const editURL = this.base_url+'/updateUser/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, user: User) {
    this.deleteId = user.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeUser/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
