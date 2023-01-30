import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dossier } from '../models/dossier.model';
import { Lot } from '../models/lot.model';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';





@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {

  base_url:string;

  planitems : any[]
  dossiers : any[];
  lots : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  dossierId : number;


  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm: FormGroup;
  logForm: FormGroup;
  isSubmitted = false;
  brandList;
  /*---------------------*/

  images;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;
  /*------------------------------------------------*/
  Posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,15,25,50,100,150];
   /*------------------------------------------------*/
  public filter: any = '';

  query: string;
  pieces: any[];

   selected: number;

    /*--------------*/
  usergroup_id;

  view:number=0;
  add:number=0;
  edit:number=0;
  remove:number=0;

  /*------------------------------------------------*/
  user_id:number;
  agent_id:number;
  agent_name:string;
  cpt:number=0;

  current_date:string;
  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private _fb:FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute,
    private loginService: LoginService)
    {}



  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllPlanitems();
    this.getAllDossier();
    this.getAllPiece();
    this.findLog();

    this.editForm = this.fb.group({
      id: [''],
      planitem_id: [''],
      numero_doss: [''],
      intitule_doss: [''],
      date_trans_sign: [''],
      date_retour_sign: [''],
      date_trans_dgcmef: [''],
      dossier: [''],
      statut: ['']

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
        let fonct = 7;

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
        /*================================*/
        var ladate = new Date();
        //this.annee= ladate.getFullYear();
        this.annee = 2022;
        if(this.usergroup_id == 5)
        {
            if(this.agent_id)
            {
                this.httpclient.get<any>(this.base_url+'/findDossierByAgent/'+this.agent_id+'/'+this.annee).subscribe(
                  response => {
                    //console.log(response);
                    this.dossiers = response;
                    this.cpt = response.length;

                  }
                );
            }
            else
            {

            }
        }
        else
        {
          this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
            response => {
              //console.log(response);
              this.dossiers = response;
              this.cpt = response.length;

            }
          );


        }
        /*================================*/
      }
    );
  }

  /*-----*/
  getAllPiece(){
    this.httpclient.get<any>(this.base_url+'/getAllPiece').subscribe(
      response => {
        this.pieces = response;
      }
    );
  }
  /*-----*/


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }

  getAllDossier(){
   var ladate = new Date();
   this.annee= ladate.getFullYear();
    this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
      response => {
        this.dossiers = response;
      }
    );
  }

  getAllPlanitems(){
    //this.annee = 2022;
    var ladate = new Date();
    this.annee= ladate.getFullYear();
    this.httpclient.get<any>(this.base_url+'/findPlanitem/'+this.annee).subscribe(
      response => {
        this.planitems = response;
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
    const url = this.base_url+'/createDossier';

    f.value['dossier'] = this.filename;
    /*--------------------------*/
    let num_doss = f.value['numero_doss'];
    /*--------------------------*/

    if(f.value['date_trans_dgcmef'].length > 0)
    {
      f.value['taux_avencement'] = 15;
    }
    else{f.value['taux_avencement'] = 0;}

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        //this.ngOnInit(); //reload the table

      });
    //this.modalService.dismissAll(); //dismiss the modal
    /* -----------------*/
     this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Création du dossier N° '+num_doss+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
     this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
      this.ngOnInit();
    });
   /* -----------------*/
   // console.log("Nom dossier upload : " +this.filename);
    const formData = new FormData();
    formData.append('file', this.images);

   /* this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/

    this.modalService.dismissAll(); //dismiss the modal
    //this.toastr.info("File name : "+ this.filename);
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



  openDetails(targetModal, dossier: Dossier) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('numero_doss_detail').setAttribute('value', dossier.numero_doss);
    document.getElementById('intitule_doss_detail').setAttribute('value', dossier.intitule_doss);
    document.getElementById('date_trans_sign_detail').setAttribute('value', dossier.date_trans_sign);
    document.getElementById('date_retour_sign_detail').setAttribute('value', dossier.date_retour_sign);
    document.getElementById('date_trans_dgcmef_detail').setAttribute('value', dossier.date_trans_dgcmef);

  }

  openEdit(targetModal, dossier: Dossier) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: dossier.id,
      planitem_id: dossier.planitem_id,
      numero_doss: dossier.numero_doss,
      intitule_doss: dossier.intitule_doss,
      date_trans_sign: dossier.date_trans_sign,
      date_retour_sign: dossier.date_retour_sign,
      date_trans_dgcmef: dossier.date_trans_dgcmef,
      dossier: this.filename,
      statut: dossier.statut
    });
  }

  onSave() {
    const editURL = this.base_url+'/updateDossier/' + this.editForm.value.id;

    //console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Modification du dossier N° '+this.editForm.value.numero_doss+' par '+this.agent_name+' | '+this.current_date,
      });

      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

      });
      /*++++++++++*/
  }

  openDelete(targetModal, dossier: Dossier) {
    this.deleteId = dossier.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeDossier/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.error("Suppression effectuer avec succés");
      });
      /* -----------------*/
      this.brandForm.patchValue({
        user_id: this.user_id,
        action: 'Suppression du dossier ID '+this.deleteId+' par '+this.agent_name+' | '+this.current_date,
      });

      this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

      });
      /*++++++++++*/
  }






   /*----******/
   onTableDataChange(event: any){
    this.page = event;
    this.getAllDossier();
  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllDossier();
  }








}
