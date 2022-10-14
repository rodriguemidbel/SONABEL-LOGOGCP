import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Scaminv } from '../models/scaminv.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-scaminv',
  templateUrl: './scaminv.component.html',
  styleUrls: ['./scaminv.component.css']
})
export class ScaminvComponent implements OnInit {

  base_url : string;

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Paiement de dossier';
  mediaSub: Subscription;

  scaminvs : any[];
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



  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getScaminv();
    this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        date_scam: [''],
        heure_scam: [''],
        lieu_scam: [''],
        membre_scam: [''],
        president_sct: [''],
        distinc_presi_sct: [''],
        ampliation: ['']
      } );


  }

   /*---------------------------------*/
   getScaminv(){
    this.httpclient.get<any>(this.base_url+'/getAllScaminv/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.scaminvs = response;

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
  const url = this.base_url+'/createScaminv';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}



openEdit(targetModal, scaminv: Scaminv) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: scaminv.id,
    dossier_id: scaminv.dossier_id,
    date_scam: scaminv.date_scam,
    heure_scam: scaminv.heure_scam,
    lieu_scam: scaminv.lieu_scam,
    membre_scam: scaminv.membre_scam,
    president_sct: scaminv.president_sct,
    distinc_presi_sct: scaminv.distinc_presi_sct,
    ampliation: scaminv.ampliation

  });
}

onSave() {
  const editURL = this.base_url+'/updateScaminv/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, scaminv: Scaminv) {
  this.deleteId = scaminv.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeScaminv/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

/*----------------------------------*/
 ngOnDestroy() {
  this.mediaSub.unsubscribe();
}

 getOneDossier(){
  this.httpclient.get<any>(this.base_url+'/getOneDossier/'+this.dossierid).subscribe(
    response => {
      console.log(response);
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
    this.getScaminv();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getScaminv();
  }





}
