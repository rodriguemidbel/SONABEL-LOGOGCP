import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Offre } from '../models/offre.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  base_url : string;


  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Offre';
  mediaSub: Subscription;

  offres : any[];
  lettreOffres: any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;
  offre_id: number;

  soumissionaires: any[];

  today;

  /*------------------------------------------------*/
  Posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,15,25,50,100,150];
   /*------------------------------------------------*/
  public filter: any = '';

  query: string;

  images;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;

  /*---------Fournisseur---------*/
  fournisseurs : any[];
  fournisseur_id:number;
  /*---------Lot----------*/
  lots : any[];
  lot_id:number;
  /*----------------------*/
  ventefrs : any[];

  brandForm: FormGroup;
  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();

    var ladate = new Date();
    this.today = ladate;

    this.dossierid = this.snap.snapshot.params['dossierid'];
    this.getOneDossier();



    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getAllFrsDossier();

    this.getOffre();
    this.getLotForDossier();

    this.editForm = this.fb.group({
      id: [''],
      off_doss_id: [''],
      lot_id:[''],
      entreprise_cons: [''],
      date_depot: [''],
      heure_depot: [''],
      nom_prenom_dep: [''],
      telephone_dep: [''],
      montant_offre: [''],
      montant_corrige: [''],
      asf: [''],
      asc: [''],
      ajt: [''],
      drtss: [''],
      rccm: [''],
      cnf: [''],
      caut: [''],
      fichier_caution: ['']
    } );


  }


  getLotForDossier(){
    this.httpclient.get<any>(this.base_url+'/findLot/'+this.dossierid).subscribe(
      response => {
        //console.log(response);
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
  /**************************************** */
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
   getOffre(){
    this.httpclient.get<any>(this.base_url+'/getAllOffre/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.offres = response;

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
  const url = this.base_url+'/createOffre';
  this.httpclient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}
/*++++++++++++++++++++++++++++++++++++++++++++++++++*/
openDetails(targetModal, offre: Offre) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
     /*============================*/
     this.httpclient.get<any>(this.base_url+'/findVenteID/'+offre.lot_id+'/'+offre.entreprise_cons).subscribe(
      result => {
        let vente_id = result[0]['vente_id'];
        //console.log('Vente ID : '+vente_id);
        /*+++++++++++++++++*/

        this.httpclient.get<any>(this.base_url+'/getAllVentefrs/'+vente_id).subscribe(
          tmp => {
            this.ventefrs = tmp;
            //console.log('Vente ID : '+vente_id);

          });
        /*=================*/
      });
     /*============================*/

    this.editForm.patchValue( {
      id: offre.id,
      off_doss_id: offre.off_doss_id,
      lot_id: offre.lot_id,
      entreprise_cons: offre.entreprise_cons,
      date_depot: offre.date_depot,
      heure_depot: offre.heure_depot,
      nom_prenom_dep: offre.nom_prenom_dep,
      telephone_dep: offre.telephone_dep,
      montant_offre: offre.montant_offre,
      montant_corrige: offre.montant_corrige,
      fichier_caution: offre.fichier_caution

    });

}
save(){

}

annuler(){}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/
openEdit(targetModal, offre: Offre) {

  this.lot_id = offre.lot_id;
  /*-----------------*/
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: offre.id,
    off_doss_id: offre.off_doss_id,
    entreprise_cons: offre.entreprise_cons,
    date_depot: offre.date_depot,
    heure_depot: offre.heure_depot,
    nom_prenom_dep: offre.nom_prenom_dep,
    telephone_dep: offre.telephone_dep,
    montant_offre: offre.montant_offre,
    montant_corrige: offre.montant_corrige

  });

}

onSave() {
  const editURL = this.base_url+'/updateOffre/' + this.editForm.value.id;
  //console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      /* -----------------*/
        //console.log("Nom dossier upload : " +this.filename);
        const formData = new FormData();
        formData.append('file', this.images);

        this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      /*----------*/
      this.toastr.warning("Modification effectuer avec succés");
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, offre: Offre) {
  this.deleteId = offre.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeOffre/' +this.deleteId;
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
    this.getOffre();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOffre();
  }

  /*-------LETTRE----------------*/
  imprimerLettre(iden){
    this.offre_id = iden;
   /* this.httpclient.get<any>(this.base_url+'/getOneOffre/'+this.offre_id).subscribe(
      response => {
        console.log(response);
        this.lettreOffres = response;
      }
    );*/
  }
  /*-----------*/



}
