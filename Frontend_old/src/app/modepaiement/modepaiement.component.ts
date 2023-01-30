import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Modepaie } from '../models/modepaiement.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-modepaiement',
  templateUrl: './modepaiement.component.html',
  styleUrls: ['./modepaiement.component.css']
})
export class ModepaiementComponent implements OnInit {

  base_url :string;
  modes : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;


  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService, private loginService:LoginService) {}

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllMode();
    this.editForm = this.fb.group({
      id: [''],
      libelle: ['']
    } );
  }

  getAllMode(){
    this.httpclient.get<any>(this.base_url+'/getAllModepaie').subscribe(
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
    const url = this.base_url+'/createModepaie';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, modepaie: Modepaie) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    document.getElementById('id_detail').setAttribute('value', modepaie.id.toString());
    document.getElementById('libelle_detail').setAttribute('value', modepaie.libelle);

  }

  openEdit(targetModal, modepaie: Modepaie) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: modepaie.id,
      libelle: modepaie.libelle


    });
  }

  onSave() {
    const editURL = this.base_url+'/updateModepaie/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.toastr.warning("Modification effectuer avec succés");
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, modepaie: Modepaie) {
    this.deleteId = modepaie.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeModepaie/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

   /*----******/
   onTableDataChange(event: any){
    this.page = event;
    this.getAllMode();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllMode();
  }




}
