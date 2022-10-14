import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Caution } from '../models/caution.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-caution',
  templateUrl: './caution.component.html',
  styleUrls: ['./caution.component.css']
})
export class CautionComponent implements OnInit {

  base_url :string;

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Caution';
  mediaSub: Subscription;

  cautions : any[];
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

  /*---------------------*/

  images;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;
  /*------------------------------------------------*/

  lotid : number;
  montant_lot: number = 0;
  montant_aut: number = 0;

  fourID: number;


  /*---------Fournisseur---------*/
  fournisseurs : any[];
  fournisseur_id:number;
  /*---------Lot----------*/
  lots : any[];
  lot_id:number;

  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();
    //this.getAllFrs();
    this.getLotForDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getCaution();
      this.editForm = this.fb.group({
        id: [''],
        cau_doss_id: [''],
        lot_id: [''],
        soumissionaire: [''],
        date_caution: [''],
        banque: [''],
        montant_caution: ['']

      } );

  }


  getLotForDossier(){
    this.httpclient.get<any>(this.base_url+'/findLot/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.lots = response;

      }
    );
  }


  onChangeLot(event)
  {
    this.lot_id = event.target.value;
    /*===================*/
    if(this.lot_id)
    {

      /*----------*/
       this.httpclient.get<any>(this.base_url+'/getOneLot/'+this.lot_id).subscribe(
          response => {
            this.montant_lot = response['montant_lot'];

            this.montant_aut = this.montant_lot * 0.05;
          }
        );
      /*--------*/
       this.httpclient.get<any>(this.base_url+'/findFrsVente/'+this.lot_id).subscribe(
          response => {
            this.fournisseurs = response;
          }
        );
    }
  }

   /*---------------------------------*/
   /*getAllFrs(){
    this.httpclient.get<any>(this.base_url+'/findVente/1').subscribe(
      response => {
        console.log(response);
        this.soumissionaires = response;

      }
    );*/
    /*this.httpclient.get<any>(this.base_url+'/getAllFournisseur/').subscribe(
      response => {
        //console.log(response);
        this.soumissionaires = response;

      }
    );
  }*/

  onChangeFrs(event)
  {
    this.fourID  = event.target.value;
    if(this.fourID)
    {
        /*----------*/
        this.httpclient.get<any>(this.base_url+'/findFrsVente/'+this.fourID).subscribe(
          response => {
            this.lots = response;
          }
        );
    }
  }

  onChange(event){
    this.lotid  = event.target.value;
    if(this.lotid)
    {
        /*----------*/
        this.httpclient.get<any>(this.base_url+'/getOneLot/'+this.lotid).subscribe(
          response => {
            this.montant_lot = response['montant_lot'];

            this.montant_aut = this.montant_lot * 0.05;
          }
        );
    }
  }

   /*---------------------------------*/



  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }

   /*---------------------------------*/
   getCaution(){
    this.httpclient.get<any>(this.base_url+'/findCaution/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.cautions = response;

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
   let alpha = f.value['montant_caution'];

  const url = this.base_url+'/createCaution';
  if(alpha == this.montant_aut)
  {
    this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    /* -----------------*/
    //console.log("Nom dossier upload : " +this.filename);
    const formData = new FormData();
    formData.append('file', this.images);

    this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.modalService.dismissAll(); //dismiss the modal
    this.toastr.success("Enregistrement effectuer avec succés");
  }
  else
  {
    this.toastr.error("Le montant de la caution ne correspond pas à 5% du montant du lot");
  }

}

openDetails(targetModal, caution: Caution) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });

}

openEdit(targetModal, caution: Caution) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: caution.id,
    cau_doss_id: caution.cau_doss_id,
    lot_id: caution.lot_id,
    soumissionaire: caution.soumissionaire,
    date_caution: caution.date_caution,
    banque: caution.banque,
    montant_caution: caution.montant_caution

  });
}

onSave() {
  const editURL = this.base_url+'/updateCaution/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, caution: Caution) {
  this.deleteId = caution.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeCaution/' +this.deleteId;
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
    this.getCaution();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCaution();
  }





}
