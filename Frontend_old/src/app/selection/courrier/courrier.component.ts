import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Courrier } from '../../models/courrier.model';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrls: ['./courrier.component.css']
})
export class CourrierComponent implements OnInit {

  base_url :string;

  //base_url = 'http://192.168.215.131:3000';

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  images;

  filename: string;

  courriers : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  title = 'Publication courriers';
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

   url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";



  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private modalService: NgbModal, private loginService:LoginService){}
 ngOnInit(): void {

  this.base_url = this.loginService.base_url();
  this.dossierid = this.snap.snapshot.params['dossierid'];
  this.getOneDossier();

  this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
    console.log(res.mqAlias);
    this.deviceXs = res.mqAlias === "xs" ? true : false;
  })



  this.getcourriers();
    this.editForm = this.fb.group({
      id: [''],
      dossier_id: [''],
      date_courrier: [''],
      objet: [''],
      fichier: ['']
    });

 }
/*---------------------------------*/
getcourriers(){
  this.httpclient.get<any>(this.base_url+'/findCourrier/'+this.dossierid).subscribe(
    response => {
      console.log(response);
      this.courriers = response;

    }
  );
}


imprimerRecu(courrier_id){
  this.deleteId = courrier_id;
  this.getOnecourrier();
}

getOnecourrier(){
  this.httpclient.get<any>(this.base_url+'/getOneCourrier/'+this.deleteId).subscribe(
    response => {
      console.log(response);
      this.courriers = response;


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
  const url = this.base_url+'/createCourrier';

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
  this.modalService.dismissAll(); //dismiss the modal
}

openEdit(targetModal, courrier: Courrier) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: courrier.id,
    dossier_id: courrier.dossier_id,
    objet: courrier.objet,
    date_courrier: courrier.date_courrier,
    fichier: courrier.fichier

  });
}

selectImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.images = file;
    this.filename =  file.name;
  }
}

onSave() {
  const editURL = this.base_url+'/updateCourrier/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, courrier: Courrier) {
  this.deleteId = courrier.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeCourrier/' +this.deleteId;
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
    this.getcourriers();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getcourriers();
  }






}
