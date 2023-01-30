import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Resultat } from '../models/resultat.model';
import { LoginService } from '../services/login.service';
import { Dossier } from '../models/dossier.model';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  base_url :string;
  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  //dossiers : any[];
  dossiers : Dossier;

  title = 'Offre';
  mediaSub: Subscription;

  resultats : any[];
  closeResult : string;
  editForm : FormGroup;
  brandForm: FormGroup;
  deleteId : number;

  usergroup_id;
  user_id:number;
  agent_id:number;
  agent_name:string;



  images;
  fileresultat: string;

  images2;
  filedecision: string;

  soumissionaires: any[];


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

    this.getAllFrsDossier();
    this.findLog();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getResultat();
      this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        num_par_res: [''],
        date_par_res: [''],
        attributaire: [''],
        litige: [''],
        fichierpub: [''],
        fichierlitige: ['']

      } );

      /*---------------*/
  this.brandForm = this.fb.group({
    id: [0],
    user_id: ['', Validators.required],
    action: ['', Validators.required]
  });



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
      this.fileresultat = file.name;
    }
  }

  selectImage2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images2 = file;
      this.filedecision = file.name;
    }
  }

   /*---------------------------------*/
   getResultat(){
    this.httpclient.get<any>(this.base_url+'/getAllResultat/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.resultats = response;

      }
    );
  }
  /*---------------------------------*/
  getAllFrsDossier(){
    this.httpclient.get<any>(this.base_url+'/findVente/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.soumissionaires = response;

      }
    );
  }

   /*---------------------------------*/

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
  const url = this.base_url+'/createResultat';

  let num_par_res = f.value['num_par_res'];

  f.value['fichierpub'] = this.fileresultat;
  f.value['fichierlitige'] = this.filedecision;


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
  /*-----------------*/
  const formData2 = new FormData();
  formData2.append('file', this.images2);
  this.httpclient.post<any>(this.base_url+'/file', formData2).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  this.modalService.dismissAll(); //dismiss the modal

   /* -----------------*/
   this.brandForm.patchValue({
    user_id: this.user_id,
    action: 'Enregistrement de la publication de resultat N° '+num_par_res+' du dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name
  });
  //console.log(this.brandForm.value);
  this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
  });
  /* -----------------*/
}



openEdit(targetModal, resultat: Resultat) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: resultat.id,
    dossier_id: resultat.dossier_id,
    num_par_res: resultat.num_par_res,
    date_par_res: resultat.date_par_res,
    attributaire: resultat.attributaire,
    litige: resultat.litige,
    fichierpub: resultat.fichierpub,
    fichierlitige: resultat.fichierlitige
  });
}

onSave() {
  const editURL = this.base_url+'/updateResultat/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });

  /* -----------------*/
  this.brandForm.patchValue({
    user_id: this.user_id,
    action: 'Modification de la publication de resultat N° '+this.editForm.value.num_par_res+' du dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name
  });
  //console.log(this.brandForm.value);
  this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
  });
  /* -----------------*/
}

openDelete(targetModal, resultat: Resultat) {
  this.deleteId = resultat.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeResultat/' +this.deleteId;
  this.httpclient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });

  /* -----------------*/
   this.brandForm.patchValue({
    user_id: this.user_id,
    action: 'Suppression de la publication de resultat ID : '+this.deleteId+' du dossier N° '+this.dossiers['numero_doss']+' par '+this.agent_name
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
    this.getResultat();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getResultat();
  }




}
