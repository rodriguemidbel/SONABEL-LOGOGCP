import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Ouverture } from '../models/ouverture.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-ouverture',
  templateUrl: './ouverture.component.html',
  styleUrls: ['./ouverture.component.css']
})
export class OuvertureComponent implements OnInit {
  base_url : string;
  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  ouvertures : any[];
  dossiers: any[];

  images;

  ouvertFichier: string;

  ouverts : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  title = 'Publication ouverts';
  mediaSub: Subscription;

  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private modalService: NgbModal, private loginService: LoginService){}
 ngOnInit(): void {

  this.base_url = this.loginService.base_url();

  this.dossierid = this.snap.snapshot.params['dossierid'];
  this.getOneOuverture();

  this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
    console.log(res.mqAlias);
    this.deviceXs = res.mqAlias === "xs" ? true : false;
  })



  this.getOuvertures();
    this.editForm = this.fb.group({
      id: [''],
      dossier_id: [''],
      date_convocation: [''],
      date_transpv_sign: [''],
      date_retourpv_sign: [''],
      date_transpv_dgcmef: [''],
      pv: ['']
    });

 }
/*---------------------------------*/
getOuvertures(){
  this.httpclient.get<any>(this.base_url+'/getAllOuverture').subscribe(
    response => {
      console.log(response);
      this.ouvertures = response;

    }
  );
}


imprimerRecu(ouvert_id){
  this.deleteId = ouvert_id;
  this.getOneOuverture();
}

getOneOuverture(){
  this.httpclient.get<any>(this.base_url+'/getOneOuverture/'+this.deleteId).subscribe(
    response => {
      console.log(response);
      this.ouverts = response;


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
  const url = this.base_url+'/createOuverture';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  /*-----------------*/
  const formData = new FormData();
  formData.append('file', this.images);
  this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  this.modalService.dismissAll(); //dismiss the modal
}

openDetails(targetModal, ouvert: Ouverture) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  document.getElementById('dossierid_detail').setAttribute('value', ouvert.dossier_id.toString());
  document.getElementById('date_conv_detail').setAttribute('value', ouvert.date_convocation);
  document.getElementById('date_transpv_sign_detail').setAttribute('value', ouvert.date_transpv_sign);
  document.getElementById('date_retourpv_sign_detail').setAttribute('value', ouvert.date_retourpv_sign);
  document.getElementById('date_transpv_dgcmef_sign_detail').setAttribute('value', ouvert.date_transpv_dgcmef);

}

openEdit(targetModal, ouvert: Ouverture) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: ouvert.id,
    dossier_id: ouvert.dossier_id,
    date_convocation: ouvert.date_convocation,
    date_transpv_sign: ouvert.date_transpv_sign,
    date_retourpv_sign: ouvert.date_retourpv_sign,
    date_transpv_dgcmef: ouvert.date_transpv_dgcmef

  });
}

onSave() {
  const editURL = this.base_url+'/updateOuverture/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, ouvert: Ouverture) {
  this.deleteId = ouvert.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeOuverture/' +this.deleteId;
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


 selectImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.images = file;
    this.ouvertFichier = file.filename;
  }
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





}
