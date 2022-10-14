import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Deliberation } from '../models/deliberation.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-deliberation',
  templateUrl: './deliberation.component.html',
  styleUrls: ['./deliberation.component.css']
})
export class DeliberationComponent implements OnInit {

  base_url : string;
  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Déliberation';
  mediaSub: Subscription;

  deliberations : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  images;

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
    private modalService: NgbModal, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getDeliberation();
      this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        date_convocation: [''],
        date_transpv_sign: [''],
        date_retourpv_sign: [''],
        date_transpv_dgcmef: [''],
        pvdeliberation: ['']
      } );
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename = file.name;
    }
  }

  /*---------------------------------*/
  getDeliberation(){
    this.httpclient.get<any>(this.base_url+'/getAllDeliberation/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.deliberations = response;

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
  const url = this.base_url+'/createDeliberation';

  f.value['pvdeliberation'] = this.filename;

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

openDetails(targetModal, delib: Deliberation) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  document.getElementById('dossierid_detail').setAttribute('value', delib.dossier_id.toString());

}

openEdit(targetModal, delib: Deliberation) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: delib.id,
    dossier_id: delib.dossier_id,
    date_convocation: delib.date_convocation,
    date_transpv_sign: delib.date_transpv_sign,
    date_retourpv_sign: delib.date_retourpv_sign,
    date_transpv_dgcmef: delib.date_transpv_dgcmef,
    pvdeliberation: delib.pvdeliberation


  });
}

onSave() {
  const editURL = this.base_url+'/updateDeliberation/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, delib: Deliberation) {
  this.deleteId = delib.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeDeliberation/' +this.deleteId;
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
    this.getDeliberation();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDeliberation();
  }




}
