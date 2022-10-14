import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Avis } from '../models/avis.model';
import { Dossier } from '../models/dossier.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {

  base_url:string;
  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  images;

  aviFichier: string;

  avis : any[];
  closeResult : string;
  editForm : FormGroup;
  dossierForm: FormGroup;
  deleteId : number;

  title = 'Publication avis';
  mediaSub: Subscription;

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


  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private loginService:LoginService){}
 ngOnInit(): void {

  this.base_url = this.loginService.base_url();
  this.dossierid = this.snap.snapshot.params['dossierid'];
  this.getOneDossier();

  this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
    console.log(res.mqAlias);
    this.deviceXs = res.mqAlias === "xs" ? true : false;
  })



  this.getAvis();
  this.editForm = this.fb.group({
    id: [''],
    dossier_id: [''],
    date_envoi: [''],
    num_publi: [''],
    date_publi: [''],
    fichier: ['']
  });

  this.dossierForm = this.fb.group({
    taux_avencement: ['']
  });

 }
/*---------------------------------*/
getAvis(){
  this.httpclient.get<any>(this.base_url+'/getAllAvi/'+this.dossierid).subscribe(
    response => {
      console.log(response);
      this.avis = response;

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


imprimerRecu(avi_id){
  this.deleteId = avi_id;
  this.getOneAvi();
}

getOneAvi(){
  this.httpclient.get<any>(this.base_url+'/getOneAvi/'+this.deleteId).subscribe(
    response => {
      console.log(response);
      this.avis = response;


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
  const url =this.base_url+'/createAvi';

  f.value['fichier'] = this.filename;

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
  /*=================*/
  if(f.value['date_publi'].length > 0)
  {
      let taux = 20;
      /*---------*/
      this.dossierForm.patchValue({
        taux_avencement: taux
      });
      /*++++++++*/
      const dosURL = this.base_url+'/updateDossier/' + f.value['dossier_id'];

      this.httpclient.patch(dosURL, this.dossierForm.value)
      .subscribe((results) => {
        //this.toastr.warning("Dossier ID : " + f.value['dossier_id']+" Taux " + taux);
      });
      /*----------*/
  }
  /*=================*/
  this.modalService.dismissAll(); //dismiss the modal
}

openDetails(targetModal, avi: Avis) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  document.getElementById('dossierid_detail').setAttribute('value', avi.dossier_id.toString());
  document.getElementById('datenvois_detail').setAttribute('value', avi.date_envoi);
  document.getElementById('numparut_detail').setAttribute('value', avi.num_publi);
  document.getElementById('dateparut_detail').setAttribute('value', avi.date_publi);

}

openEdit(targetModal, avi: Avis) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: avi.id,
    dossier_id: avi.dossier_id,
    date_envoi: avi.date_envoi,
    num_publi: avi.num_publi,
    date_publi: avi.date_publi,
    fichier: avi.fichier

  });
}

onSave() {
  const editURL = this.base_url+'/updateAvi/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, avi: Avis) {
  this.deleteId = avi.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeAvi/' +this.deleteId;
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
    this.getAvis();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAvis();
  }



}
