import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Avis } from '../models/avis.model';
import { Pubavis } from '../models/pubavis.model';
import { Dossier } from '../models/dossier.model';

@Component({
  selector: 'app-pubavis',
  templateUrl: './pubavis.component.html',
  styleUrls: ['./pubavis.component.css']
})
export class PubavisComponent implements OnInit {

  base_url = 'http://localhost:3000';
  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  //dossiers : any[];
  dossiers : Dossier;
  aviFichier: string;

  avis : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  title = 'Publication avis';
  mediaSub: Subscription;

  /*------------------------------------------------*/
  Posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,15,25,50,100,150];
   /*------------------------------------------------*/
  public filter: any = '';

  query: string;

  date_imp: string;
  date_imp_inv: string;

  images;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;

  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private toastr: ToastrService){}
 ngOnInit(): void {
  this.dossierid = this.snap.snapshot.params['dossierid'];
  this.getOneDossier();

  this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
    //console.log(res.mqAlias);
    this.deviceXs = res.mqAlias === "xs" ? true : false;
  })



  this.getAvis();
    this.editForm = this.fb.group({
      id: [''],
      dossier_id: [''],
      date_bordereau: [''],
      fichier: [''],
      observation: ['']
    });

      /*---------*/
      this.currentDate();
      /*------*/

 }
/*---------------------------------*/

 /*---------------------------------*/
 currentDate(){
  /*--------Date du jour en cas de creation-----------*/
  let jour;
  let mois;

  let cur_date = new Date();

  let dd = cur_date.getDate();
  let mm = cur_date.getMonth() + 1; // Months start at 0!
  let yyyy = cur_date.getFullYear();

  if (dd < 10) {jour = '0' + dd;}else{jour = dd;}
  if (mm < 10) {mois = '0' + mm;}else{mois = mm;}


  this.date_imp = jour + '/' + mois + '/' + yyyy;
  this.date_imp_inv = yyyy + '-' + mois + '-' + jour;

  /*-------------------*/
}


getAvis(){
  this.httpclient.get<any>(this.base_url+'/findPubavis/'+this.dossierid).subscribe(
    response => {
      //console.log(response);
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
      //console.log(response);
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
  const url =this.base_url+'/createPubavis';

  f.value['date_bordereau'] = this.date_imp_inv;


  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.toastr.success("Enregistrement effectuer avec succés");
      this.ngOnInit(); //reload the table
    });
  /*-----------------*/
   //console.log("Nom dossier upload : " +this.filename);
   /*const formData = new FormData();
   formData.append('file', this.images);

   this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
   );
  -------------*/
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

openEdit(targetModal, pub: Pubavis) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: pub.id,
    dossier_id: pub.dossier_id,
    date_bordereau: pub.date_bordereau,
    fichier: pub.fichier,
    observation: pub.observation,


  });
}

onSave() {
  const editURL = this.base_url+'/updatePubavis/' + this.editForm.value.id;
  //console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
      this.toastr.warning("Modification effectuer avec succés");
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
  const deleteURL = this.base_url+'/removePubavis/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.toastr.success("Suppression effectué avec succés");
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
