import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Ouverture } from '../models/ouverture.model';
import { Proceverb } from '../models/proceverb.model';
import { Dossier } from '../models/dossier.model';

@Component({
  selector: 'app-proceverb',
  templateUrl: './proceverb.component.html',
  styleUrls: ['./proceverb.component.css']
})
export class ProceverbComponent implements OnInit {

  base_url = 'http://localhost:3000';

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  //dossiers : any[];
  dossiers : Dossier;
  proceverbs: any[];

  title = 'PV d\'ouverture';
  mediaSub: Subscription;


  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  images;

  filename: string;
  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
  /*------------------------------------------------*/
  public filter: any = '';

  query: string;
  /*------------------------------------------------*/
  user_id;
  username;
  usergroup_id;
  agent_id;

  agent_name;

  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService ) { }

  ngOnInit(): void {

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();
    /*-------------------------*/
      this.user_id = localStorage.getItem('userID');
      this.username = localStorage.getItem('userName');
      this.usergroup_id = localStorage.getItem('userGroupID');
      this.agent_id = localStorage.getItem('agentID');
    /*--------------------------*/
      this.agent_name = localStorage.getItem('userName');

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getProceverb();
      this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        date_convocation: [''],
        date_transpv_sign: [''],
        date_retourpv_sign: [''],
        date_transpv_dgcmef: [''],
        pv: ['']
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
  getProceverb(){
    this.httpclient.get<any>(this.base_url+'/findProceverb/'+this.dossierid).subscribe(
      response => {
        this.proceverbs = response;
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
  const url = this.base_url+'/createProceverb';

  f.value['pv'] = this.filename;

  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
   /* -----------------*/
   /*const formData = new FormData();
   formData.append('file', this.images);

   this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
   );*/
   this.modalService.dismissAll(); //dismiss the modal
   //this.toastr.info("File name : "+ this.filename);
}

openDetails(targetModal, proce: Proceverb) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  document.getElementById('dossierid_detail').setAttribute('value', proce.dossier_id.toString());

}

openEdit(targetModal, proce: Proceverb) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: proce.id,
    dossier_id: proce.dossier_id,
    date_convocation: proce.date_convocation,
    date_transpv_sign: proce.date_transpv_sign,
    date_retourpv_sign: proce.date_retourpv_sign,
    date_transpv_dgcmef: proce.date_transpv_dgcmef,
    pv: proce.pv,

  });
}

onSave() {
  const editURL = this.base_url+'/updateProceverb/' + this.editForm.value.id;
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, proce: Proceverb) {
  this.deleteId = proce.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeProceverb/' +this.deleteId;
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
  this.httpclient.get<any>('http://localhost:3000/getOneDossier/'+this.dossierid).subscribe(
    response => {
      this.dossiers = response;
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
    this.getProceverb();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProceverb();
  }

}
