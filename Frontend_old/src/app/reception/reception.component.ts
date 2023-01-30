
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Reception} from '../models/reception.model';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  base_url : string;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;


  receptions : any[];
  typreceptions: any[];
  dossiers: any[];
  marches: [];

  alphas: any[];

  lots : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  receptionId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  isSubmitted = false;

  images;

  reception: string;
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;

   fournisseurs : any[];

   usergroup_id;
   user_id:number;
   agent_id:number;
   agent_name:string;

   current_date:string;

   constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }


  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllReception();

    this.getAllTypreception();

    this.getAllMarche();

    this.findLog();

    this.editForm = this.fb.group({
      id: [''],
      marche_id: [''],
      typreception_id: [''],
      date_recept: [''],
      heure_recept: [''],
      membre: [''],
      autre: [''],
      pv_recept: ['']

    } );

      /*---------------*/
      this.brandForm = this.fb.group({
        id: [0],
        user_id: ['', Validators.required],
        action: ['', Validators.required]
      });

      /*---------------*/
      let y = new Date();
      this.current_date = formatDate(y,'dd/MMM/yyyy  h:mm:ss a', 'eng');

  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        this.agent_id = response[0]['agent_id'];
        this.agent_name = response[0]['user_name'];
        this.user_id = response[0]['user_id'];
        //let fonct = 7;
      }
    )
  }

  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        console.log(response);
        this.alphas = response;


      }
    );
  }



  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }



  getAllTypreception(){
    this.httpclient.get<any>(this.base_url+'/getAllTypreception').subscribe(
   response => {
     console.log(response);
     this.typreceptions = response;


   }
 );
}

  getAllReception(){
       this.httpclient.get<any>(this.base_url+'/getAllReception').subscribe(
      response => {
        console.log(response);
        this.receptions = response;


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

  onSubmit(f: NgForm) {
    const url = this.base_url+'/createReception';

    let marche_id = f.value['marche_id'];

    f.value['ordre'] = this.filename;

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    console.log("Nom reception upload : " +this.reception);
    const formData = new FormData();
    formData.append('file', this.images);
    //console.log(formData);
    this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //this.toastr.info("Fichier uploader : "+f.value.json());
    this.modalService.dismissAll(); //dismiss the modal

      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Enregistrement d\'une reception du marché ID '+marche_id+' par '+this.agent_name+' | '+this.current_date
      });
      //console.log(this.brandForm.value);
      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
      });
      /* -----------------*/
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



  openDetails(targetModal, reception: Reception) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });


  }

  openEdit(targetModal, reception: Reception) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: reception.id,
      typreception_id: reception.typreception_id,
      marche_id: reception.marche_id,
      date_recept: reception.date_recept,
      heure_recept: reception.heure_recept,
      membre: reception.membre,
      autre: reception.autre,
      pv_recept: reception.pv_recept

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateReception/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });

      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Modification reception du marché ID '+this.editForm.value.marche_id+' par '+this.agent_name+' | '+this.current_date
      });
      //console.log(this.brandForm.value);
      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
      });
      /* -----------------*/
  }

  openDelete(targetModal, reception: Reception) {
    this.deleteId = reception.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeReception/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });

      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Suppression reception ID '+this.deleteId+' par '+this.agent_name+' | '+this.current_date
      });
      //console.log(this.brandForm.value);
      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
      });
      /* -----------------*/
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllReception();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllReception();
  }





}
