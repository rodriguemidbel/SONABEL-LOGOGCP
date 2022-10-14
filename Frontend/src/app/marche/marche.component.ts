import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Marche } from '../models/marche.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class MarcheComponent implements OnInit {

  base_url :string;

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  devises : any[];

  title = 'Marche';
  mediaSub: Subscription;

  marches : any[];
  closeResult : string;
  editForm : FormGroup;
  dossierForm: FormGroup;
  deleteId : number;

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

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;
  images;

  date_vente: string;
  days;

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
    private modalService: NgbModal,
    private toastr: ToastrService , private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();
    this.getAllFrsDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getAllMarche();
    this.getAllDevise();
    this.getLotForDossier();

      this.editForm = this.fb.group({
        id: [''],
        mar_doss_id: [''],
        lot_id: [''],
        num_ref: [''],
        objet: [''],
        date_appro: [''],
        date_notif: [''],
        montant: [''],
        devise: [''],
        montant2: [''],
        devise2: [''],
        montant3: [''],
        devise3: [''],
        montant4: [''],
        devise4: [''],
        montant_total: [''],
        devise_total: [''],
        delai: [''],
        attributaire: [''],
        date_rem_sign: [''],
        date_retour_sign: [''],
        date_rem_enr: [''],
        date_retour_enr: [''],
        marche: ['']
      } );

      this.dossierForm = this.fb.group({
        taux_avencement: ['']
      });

      /*-------------------*/
      let jour;
      let mois;

      let cur_date = new Date();

      let dd = cur_date.getDate();
      let mm = cur_date.getMonth() + 1; // Months start at 0!
      let yyyy = cur_date.getFullYear();

      if (dd < 10) {jour = '0' + dd;}else{jour = dd;}
      if (mm < 10) {mois = '0' + mm;}else{mois = mm;}

      this.date_vente = jour + '/' + mois + '/' + yyyy;
      /*-------------------*/

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
    //this.toastr.success("ID lot : "+this.lot_id);
    if(this.lot_id)
    {
        this.httpclient.get<any>(this.base_url+'/findFrsVente/'+this.lot_id).subscribe(
          response => {
            this.fournisseurs = response;
          }
        );
    }
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }

  /*---------------------------------*/
  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/findMarche/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.marches = response;

        //$scope.displaydash.dossiers = response.data;
      let alpha = response[0]['date_trans_dgcmef'];
      let beta = response[0]['date_notif'];
      /*++++++*/
     // To set two dates to two variables
     let date1 = new Date(alpha);
     let date2 = new Date(beta);

       let Time = date2.getTime() - date1.getTime();
      // this.days = alpha+'  '+beta; //Diference in Days
      this.days = Time / (1000 * 3600 * 24); //Diference in Days OK
     /*++++++*/

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

  getAllDevise(){
    this.httpclient.get<any>(this.base_url+'/getAllDevise').subscribe(
      response => {
        //console.log(response);
        this.devises = response;
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
  const url = this.base_url+'/createMarche';

  f.value['marche'] = this.filename;

  f.value['num_ref'] = f.value['num_ref']+'/2022/DMP';
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
   if(f.value['num_ref'].length > 0)
   {
       let taux = 25;
       /*---------*/
       this.dossierForm.patchValue({
         taux_avencement: taux
       });
       /*++++++++*/
       const dosURL = this.base_url+'/updateDossier/' + f.value['mar_doss_id'];
       console.log(dosURL);
       this.httpclient.patch(dosURL, this.dossierForm.value)
       .subscribe((results) => {
        // this.toastr.warning("Dossier ID : " + f.value['mar_doss_id']+" Taux " + taux);
       });
       /*----------*/
   }
   /*=================*/

  this.modalService.dismissAll(); //dismiss the modal
}


openEdit(targetModal, marche: Marche) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: marche.id,
    mar_doss_id: marche.mar_doss_id,
    lot_id: marche.lot_id,
    num_ref: marche.num_ref,
    objet: marche.objet,
    date_appro: marche.date_appro,
    date_notif: marche.date_notif,
    montant: marche.montant,
    devise: marche.devise,
    montant2: marche.montant2,
    devise2: marche.devise2,
    montant3: marche.montant3,
    devise3: marche.devise3,
    montant4: marche.montant4,
    devise4: marche.devise4,
    montant_total: marche.montant_total,
    devise_total: marche.devise_total,
    delai: marche.delai,
    attributaire: marche.attributaire,
    date_rem_sign: marche.date_rem_sign,
    date_retour_sign: marche.date_retour_sign,
    date_rem_enr: marche.date_rem_enr,
    date_retour_enr: marche.date_retour_enr,
    marche: marche.marche,

  });
}

onSave() {
  const editURL = this.base_url+'/updateMarche/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, marche: Marche) {
  this.deleteId = marche.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeMarche/' +this.deleteId;
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




   onTableDataChange(event: any){
    this.page = event;
    this.getAllMarche();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllMarche();
  }





}
