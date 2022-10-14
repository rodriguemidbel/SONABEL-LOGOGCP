import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Agent } from '../models/agent.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  base_url : string;
  //agents : agent[];
agents : any[];
closeResult : string;
editForm : FormGroup;
deleteId : number;


constructor(private httpclient : HttpClient,
            private modalService: NgbModal,
            private fb: FormBuilder,
            private toastr: ToastrService, private loginService:LoginService) {}

ngOnInit(): void {

  this.base_url = this.loginService.base_url();
  this.getAllagent();
  this.editForm = this.fb.group({
    id: [''],
    nom_prenom: ['']
  } );
}

getAllagent(){
  this.httpclient.get<any>(this.base_url+'/getAllAgent').subscribe(
    response => {
      console.log(response);
      this.agents = response;

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
  const url = this.base_url+'/createAgent';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.toastr.success("Enregistrement effectuer avec succés");
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

openDetails(targetModal, agent: Agent) {
  this.modalService.open(targetModal, {
  centered: true,
  backdrop: 'static',
  size: 'lg'
});
  document.getElementById('id_detail').setAttribute('value', agent.id.toString());
  document.getElementById('nom_prenom_detail').setAttribute('value', agent.nom_prenom);

}

openEdit(targetModal, agent: Agent) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: agent.id,
    nom_prenom: agent.nom_prenom


  });
}

onSave() {
  const editURL = this.base_url+'/updateAgent/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.toastr.warning("Modification effectuer avec succés");
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, agent: Agent) {
  this.deleteId = agent.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeAgent/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}
