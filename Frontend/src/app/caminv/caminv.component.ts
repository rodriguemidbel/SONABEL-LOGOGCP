import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription } from 'rxjs';
import { Caminv } from '../models/caminv.model';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';
import { Dossier } from '../models/dossier.model';



@Component({
  selector: 'app-caminv',
  templateUrl: './caminv.component.html',
  styleUrls: ['./caminv.component.css']
})
export class CaminvComponent implements OnInit {

  base_url : string;

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  //dossiers : any[];
  dossiers : Dossier;

  title = 'Invitation CAM';
  mediaSub: Subscription;

  caminvs : any[];
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

   f: FormGroup;

   blured = false
  focused = false

  usergroup_id;
  user_id:number;
  agent_id:number;
  agent_name:string;

  brandForm: FormGroup;

  current_date:string;

  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      //console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getCaminv();
    this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        date_cam: [''],
        heure_cam: [''],
        lieu_cam: [''],
        membre_cam: [''],
        president_cam: [''],
        distinc_presi_cam: [''],
        ampliation: ['']
      } );

      /*---------------*/
     this.brandForm = this.fb.group({
      id: [0],
      user_id: ['', Validators.required],
      action: ['', Validators.required]
    });
     /*--------------------*/
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


  /*---------------------------------*/
  getCaminv(){
    this.httpclient.get<any>(this.base_url+'/getAllCaminv/'+this.dossierid).subscribe(
      response => {
        //console.log(response);
        this.caminvs = response;

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
  /*-----------------------*/
  //this.f.value['ampliation'] = this.f.value['ampliation']?this.f.value['ampliation']:[];
  /*const formValue = this.f.value;
    const newCam = new Caminv (
      formValue['dossier_id'],
      formValue['date_cam'],
      formValue['heure_cam'],
      formValue['lieu_cam'],
      formValue['membre_cam'],
      formValue['ampliation'] ? formValue['ampliation'] : []
    );*/
  /*----------------------*/
  const url = this.base_url+'/createCaminv';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal

    /* -----------------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Enregistrement d\' une CAM pour le dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
    /* -----------------*/
}

/*getHobbies(): FormArray {
  return this.f.get('ampliation') as FormArray;
}

onAddHobby() {
  const newHobbyControl = this.fb.control(null, Validators.required);
  this.getHobbies().push(newHobbyControl);
}*/

/*========================*/

openEdit(targetModal, caminv: Caminv) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: caminv.id,
    dossier_id: caminv.dossier_id,
    date_cam: caminv.date_cam,
    heure_cam: caminv.heure_cam,
    lieu_cam: caminv.lieu_cam,
    membre_cam: caminv.membre_cam,
    president_cam: caminv.president_cam,
    distinc_presi_cam: caminv.distinc_presi_cam,
    ampliation: caminv.ampliation

  });
}

onSave() {
  const editURL = this.base_url+'/updateCaminv/' + this.editForm.value.id;
  //console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });

    /* -----------------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Modification CAM ID : '+this.editForm.value.id+' pour le dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
    /* -----------------*/
}

openDelete(targetModal, caminv: Caminv) {
  this.deleteId = caminv.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeCaminv/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {

      this.ngOnInit();
      this.modalService.dismissAll();
    });

    /* -----------------*/
    this.brandForm.patchValue({
      user_id: this.user_id,
      action: 'Suppression CAM ID : '+this.deleteId+' pour le dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name+' | '+this.current_date
    });
    //console.log(this.brandForm.value);
    this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {

    });
    /* -----------------*/
}

/*----------------------------------*/
 ngOnDestroy() {
  this.mediaSub.unsubscribe();
}

 getOneDossier(){
  this.httpclient.get<any>(this.base_url+'/getOneDossier/'+this.dossierid).subscribe(
    response => {
      //console.log(response);
      this.dossiers = response;
      //$scope.displaydash.dossiers = response.data;
    }
  );
 }

  onScroll(e) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

   /*----******/
   onTableDataChange(event: any){
    this.page = event;
    this.getCaminv();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCaminv();
  }



  created(event: any) {
    // tslint:disable-next-line:no-console
    //console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    //console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    //console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    //console.log('blur', $event)
    this.focused = false
    this.blured = true
  }






}
