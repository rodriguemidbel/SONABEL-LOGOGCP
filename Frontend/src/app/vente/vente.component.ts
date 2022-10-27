import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Vente } from '../models/vente.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  base_url:string;
  @Input() deviceXs: boolean;
  topVal = 0;

  filteredString ='';

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  lots : any[];
  lotid : number;
  montant_vente: number = 0;
  fournisseurs : any[];

  ventes : any[];


  closeResult : string;
  editForm : FormGroup;
  brandForm  : FormGroup;
  groupForm: FormGroup;

  deleteId : number;

  title = 'Publication ventes';
  mediaSub: Subscription;

  num_vente:string;
  statut:string;

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

  date_vente: string;
  date_vente_inv: string;

  grpent:number = 1;
  parentSelector: boolean = false;

  venteFrsForm:FormGroup;

  groupementID:number;

   /*--------------*/
   usergroup_id;

   view:number=0;
   add:number=0;
   edit:number=0;
   remove:number=0;
    /*------------------------------------------------*/

  constructor(public mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private loginService:LoginService,
              private _fb:FormBuilder){}

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();

    var ladate = new Date();
    this.today = ladate;
    this.statut = "Non payé";

      //this.dossierid = this.snap.snapshot.params['dossierid'];
      //this.getOneDossier();
      // this.getAllLot();
      this.getAllDossier();

      this.getAllFrs();
      this.resetForm();
      this.findLog();

      this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
        console.log(res.mqAlias);
        this.deviceXs = res.mqAlias === "xs" ? true : false;
      })

      this.getventes();

        this.editForm = this._fb.group({
          id: [0],
          num_vente: [''],
          date_vente: [''],
          dossier_id: [''],
          lot_id: [''],
          montant: [''],
          grpent: [''],
          fournisseur_id: ['',Validators.required],
          acheteur: [''],
          contact_acheteur: [''],
          statut: ['']
        });

       /*-------------------*/
       /*---------------*/
    this.groupForm = this._fb.group({
      id: [0],
      nom_four: ['',Validators.required],
      type: ['',Validators.required]
    });
    /*---------*/
       let jour;
       let mois;

       let cur_date = new Date();

       let dd = cur_date.getDate();
       let mm = cur_date.getMonth() + 1; // Months start at 0!
       let yyyy = cur_date.getFullYear();

       if (dd < 10) {jour = '0' + dd;}else{jour = dd;}
       if (mm < 10) {mois = '0' + mm;}else{mois = mm;}

       this.date_vente = jour + '/' + mois + '/' + yyyy;
       this.date_vente_inv = yyyy + '/' + mois + '/' + jour;
       /*-------------------*/

        /*---------------*/
    this.venteFrsForm = this.fb.group({
      id: [0],
      vente_id: ['', Validators.required],
      fournisseur_id: ['', Validators.required],
      chef_file: ['', Validators.required],
    });

  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        let fonct = 9;

        //console.log('usergroup_id : '+this.usergroup_id+' Fonc : '+fonct);

        if(this.usergroup_id && fonct)
        {
          this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
            beta => {
              //console.log('BETA : ' +beta);
              this.view = beta[0]['view'];
              this.add = beta[0]['add'];
              this.edit = beta[0]['edit'];
              this.remove = beta[0]['remove'];

              //console.log('view : '+beta[0]['view']+'Add : '+beta[0]['add']+' Modif : '+beta[0]['edit']+' remove : '+beta[0]['remove']);
            }
          );
        }

        //this.count = response.length;

      }
    );
  }

  onChangeFood($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.fournisseurs = this.fournisseurs.map((d) => {
      if (d.id == id) {
        d.select = isChecked;
        this.parentSelector = false;
        return d;
      }
      if (id == -1) {
        d.select = this.parentSelector;
        return d;
      }
      return d;
    });
    //console.log(id, isChecked);
  }


/*---------------------------------*/
getventes(){
  this.httpclient.get<any>(this.base_url+'/getAllVente').subscribe(
    response => {
      console.log(response);
      this.ventes = response;

    }
  );
}

/*---------------------------------*/
getAllDossier(){
  this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
    response => {
      console.log(response);
      this.dossiers = response;

    }
  );
}

onChangeDossier(event)
{

  this.dossierid = event.target.value;
    if(this.dossierid)
    {
        /*----------*/
        this.httpclient.get<any>(this.base_url+'/findLot/'+this.dossierid).subscribe(
          response => {
            this.lots = response;
          }
        );

    }
}


onChangeLot(event)
{
    this.lotid  = event.target.value;
    if(this.lotid)
    {
        /*----------*/
        this.httpclient.get<any>(this.base_url+'/getOneLot/'+this.lotid).subscribe(
          response => {
            this.montant_vente = response['montant_vente'];
          }
        );
    }
}
/*---------------------------------
getAllLot(){
  this.httpclient.get<any>(this.base_url+'/getAllLot').subscribe(
    response => {
      console.log(response);
      this.lots = response;

    }
  );
}*/

/*---------------------------------*/
getAllFrs(){
  this.httpclient.get<any>(this.base_url+'/getAllFournisseur/').subscribe(
    response => {
      console.log(response);
      this.fournisseurs = response;

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

save(){
  //const url = this.base_url+'/createVente';
  this.editForm['date_vente'] = this.date_vente_inv;



  if(this.grpent == 1)
  {
    this.editForm['grpent'] = 1;
    let frs_id = this.editForm.controls['fournisseur_id'].value;
    //console.log(this.editForm.value);
    this.httpclient.post(this.base_url+'/createVente', this.editForm.value).subscribe(alpha=> {
      let mouton = alpha['venteID'];
      //console.log('Vente ID : ' +mouton);
        /*++++++++++*/
         this.venteFrsForm.patchValue({
            vente_id: mouton,
            fournisseur_id: frs_id,
            chef_file: true
         });
         //console.log(this.venteFrsForm.value);

         this.httpclient.post(this.base_url+'/createVentefrs', this.venteFrsForm.value).subscribe(() => {
              this.toastr.success("Enregistrement effectuer avec succés");
              this.ngOnInit(); //reload the table
         });
        /*++++++++++*/
      });
      this.modalService.dismissAll(); //dismiss the modal
  }
  else
  {
      if(this.grpent == 2)
      {
             /*=============Création du groupement=================*/
            let prefixe = 'Groupement ';
            let sufixe = '';
            for(let i = 0; i < this.fournisseurs.length; i++){
                if(this.fournisseurs[i]['select'] == 1){
                  sufixe = sufixe + ' ' + this.fournisseurs[i]['nom_four'];
                }

            }

            let libelle = prefixe + sufixe;
            /*---------------*/
            //console.log(libelle);

              this.groupForm.patchValue({
                nom_four: libelle,
                type: 'Groupement',
                });

                console.log(this.groupForm.value);

                this.httpclient.post(this.base_url+'/createFournisseur', this.groupForm.value).subscribe(beta => {
                    this.groupementID = beta['groupementID'];

                    //console.log("Groupement : " + this.groupementID);
                    /*=========Vente==========================*/
                    this.editForm.controls['fournisseur_id'].setValue(this.groupementID);
                    this.editForm['grpent'] = 2;
                    console.log(this.editForm.value);


                    this.httpclient.post(this.base_url+'/createVente', this.editForm.value).subscribe(alpha=> {
                    let mouton = alpha['venteID'];
                    /*-----*/
                    //console.log('Vente ID : ' +mouton);
                        /*=============Création venteFRS======================*/
                        for(let i = 0; i < this.fournisseurs.length; i++){
                          if(this.fournisseurs[i]['select'] == 1)
                          {
                            /*++++++++++*/
                              this.venteFrsForm.patchValue({
                                vente_id: alpha['venteID'],
                                fournisseur_id: this.fournisseurs[i]['id'],
                                chef_file: this.fournisseurs[i]['chef']
                              });

                              console.log(this.venteFrsForm.value);

                              this.httpclient.post(this.base_url+'/createVentefrs', this.venteFrsForm.value).subscribe(() => {
                                this.toastr.success("Enregistrement effectuer avec succés");
                                this.ngOnInit(); //reload the table
                              });
                          }

                        }
                        /*=============Fin Création venteFRS======================*/
                    });


             // this.toastr.success("Enregistrement effectuer avec succés");
              //this.router.navigate(['/vente/' + this.dossierid]);
          });
          this.modalService.dismissAll(); //dismiss the modal
      }
      else
      {
        alert("Sélectionner un d'acheteur");
      }
  }

}

resetForm() {
  let year =  new Date().getFullYear();
  var seq = Math.floor(100000 + Math.random() * 900000).toString();
  this.num_vente =   seq + '-' + year.toString();
}
openDetails(targetModal, vente: Vente) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  document.getElementById('id_detail').setAttribute('value', vente.id.toString());
  document.getElementById('num_vente_detail').setAttribute('value', vente.num_vente);
  document.getElementById('lot_detail').setAttribute('value', vente.lot_id.toString());
  document.getElementById('fournisseur_detail').setAttribute('value', vente.fournisseur_id.toString());
  document.getElementById('date_vente_detail').setAttribute('value', vente.date_vente);
  document.getElementById('montant_detail').setAttribute('value', vente.montant.toString());
  document.getElementById('acheteur_detail').setAttribute('value', vente.acheteur.toString());
  document.getElementById('contact_acheteur_detail').setAttribute('value', vente.contact_acheteur.toString());
  document.getElementById('statut_detail').setAttribute('value', vente.statut);

}

openEdit(targetModal, vente: Vente) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: vente.id,
    num_vente: vente.num_vente,
    lot_id: vente.lot_id,
    fournisseur_id: vente.fournisseur_id,
    date_vente: vente.date_vente,
    montant: vente.montant,
    acheteur: vente.acheteur,
    contact_acheteur: vente.contact_acheteur,
    statut: vente.statut

  });
}

onSave() {
  const editURL = this.base_url+'/updateVente/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpclient.patch(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
      this.toastr.warning("Modification effectuer avec succés");
    });
}

openDelete(targetModal, vente: Vente) {
  this.deleteId = vente.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.base_url+'/removeVente/' +this.deleteId;
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
    this.getventes();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getventes();
  }




}
