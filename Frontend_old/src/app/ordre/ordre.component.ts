import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Ordre } from '../models/ordre.model';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['./ordre.component.css']
})
export class OrdreComponent implements OnInit {
  base_url : string;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;

  ordres : any[];
  marches: any[];
  dossiers: any[];

  lots : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  ordreId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  planitemForm:FormGroup;
  isSubmitted = false;

  images;

  ordre: string;
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
    usergroup_id;
    user_id:number;
    agent_id:number;
    agent_name:string;

   public filter: any = '';

   query: string;

   current_date:string;
  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllOrdre();
    this.getAllMarche();
    this.getAllLot();

    this.findLog();

    this.editForm = this.fb.group({
      id: [''],
      marche_id: [''],
      ref: [''],
      date_notif: [''],
      date_debut: [''],
      ordre: ['']

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



 selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }


  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        //console.log(response);
        this.marches = response;


      }
    );
  }

  getAllDossier(){
    this.annee = 2022;
    this.httpclient.get<any>(this.base_url+'/findDossier/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.dossiers = response;


      }
    );
  }

  getAllOrdre(){
       this.httpclient.get<any>(this.base_url+'/getAllOrdreserv').subscribe(
      response => {
        console.log(response);
        this.ordres = response;


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
    const url = this.base_url+'/createOrdreserv';

    let ref = f.value['ref'];
    let marche_id = f.value['marche_id'];

    //let date_debut = f.value['date_debut'];

    f.value['pv_recept'] = this.filename;

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    //console.log("Nom ordre upload : " +this.ordre);
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
      action: 'Enregistrement d\'un ordre de service N° '+ref+' du marché ID '+marche_id+' par '+this.agent_name+' | '+this.current_date
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



  openDetails(targetModal, ordre: Ordre) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('detail_id').setAttribute('value', ordre.id.toString());
    document.getElementById('detail_marcheid').setAttribute('value', ordre.marche_id.toString());
    document.getElementById('ref_detail').setAttribute('value', ordre.ref)
    document.getElementById('date_debut_detail').setAttribute('value', ordre.date_debut);
    document.getElementById('date_notif_detail').setAttribute('value', ordre.date_notif);
    document.getElementById('ordre_detail').setAttribute('value', ordre.ordre);

  }

  openEdit(targetModal, ordre: Ordre) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: ordre.id,
      marche_id: ordre.marche_id,
      ref: ordre.ref,
      date_debut: ordre.date_debut,
      date_notif: ordre.date_notif,
      ordre: ordre.ordre

    });
  }

  onSave() {
    const editURL = this.base_url+'/updateOrdreserv/' + this.editForm.value.id;
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
      action: 'Modification de l\' ordre de service ID '+this.editForm.value.id+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
    });
    /* -----------------*/
  }

  openDelete(targetModal, ordre: Ordre) {
    this.deleteId = ordre.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeOrdreserv/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });

    /* -----------------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Suppression de l\' ordre de service ID '+this.deleteId+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
    });
    /* -----------------*/
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllOrdre();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllOrdre();
  }


  getAllLot(){

    this.httpclient.get<any>(this.base_url+'/getAllLot').subscribe(
      response => {
        console.log(response);
        this.lots = response;


      }
    );
  }





}
