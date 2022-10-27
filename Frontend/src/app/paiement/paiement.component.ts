import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Paiement } from '../models/paiement.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  base_url :string;

  devises : any[];

  paiements : any[]
  dossiers: any[];

  marches : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  paiementId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  isSubmitted = false;

  images;
  filename:string;

  paiement: string;
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;

   alpha:number = 0;

   marche_id:number;
   montant_total:number;
   taux:number;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.getAllpaiement();

    this.getAllMarche();
    this.getAllDevise();

    this.editForm = this.fb.group({
      id: [''],
      marche_id: [''],
      num_facture: [''],
      date_facture: [''],
      montant_cfa: [''],
      montant_devise: [''],
      devise: [''],
      taux_exe_phy: [''],
      observation: [''],
      fichier: ['']
    } );

  }

  onChangeMarche(event)
  {
    this.marche_id = event.target.value;
    //this.toastr.success("ID lot : "+this.lot_id);
    if(this.marche_id)
    {
        this.httpclient.get<any>(this.base_url+'/getOneMarche/'+this.marche_id).subscribe(
          response => {
            this.montant_total = response['montant_total'];
            //alert(this.montant_total);
          }
        );
    }
  }

  onChangeMontant(event){
    let montant = event.target.value;
    this.taux = (montant / this.montant_total) * 100;
  }

  onChangeNotif(event)
  {
    this.alpha = event.target.value;
    /*if(this.alpha)
    {
      this.objet = this.lots[0]['intitule_lot']

        this.httpclient.get<any>(this.base_url+'/getOneNotification/'+this.alpha).subscribe(
          rho => {
            this.fournisseur_id = rho['fournisseur_id'];
            this.lot_id = rho['lot_id'];
            this.date_notif = rho['date_notif'];
          }
        );

        if(this.lot_id){
          this.httpclient.get<any>(this.base_url+'/getOneLot/'+this.lot_id).subscribe(
            sigma => {
              this.objet = sigma['intitule_lot'];
              this.montant = sigma['montant_lot'];

            }
          );
        }

    }*/
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }


  getAllDevise(){
    this.httpclient.get<any>(this.base_url+'/getAllDevise').subscribe(
      response => {
        //console.log(response);
        this.devises = response;
      }
    );
  }


  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        console.log(response);
        this.marches = response;
      }
    );
  }

  getAllpaiement(){
       this.httpclient.get<any>(this.base_url+'/getAllPaiement').subscribe(
      response => {
        console.log(response);
        this.paiements = response;


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

  onSubmit(f: NgForm) {

    f.value['fichier'] = this.filename;

    /*let marcheid = f.value['marche_id'];
    let mnt_paie = f.value['montant'];
    let tx_finan = (mnt_paie / 46600000) * 100;

    f.value['taux_exe_fin'] = tx_finan;*/
    console.log(f.value);

    const url = this.base_url+'/createPaiement';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
     /*-----------------*/
   const formData = new FormData();
   formData.append('file', this.images);
   this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
   );
   /*=================*/
    //this.toastr.info("Fichier uploader : "+f.value.json());
    this.modalService.dismissAll(); //dismiss the modal
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



  openDetails(targetModal, paiement: Paiement) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('detail_id').setAttribute('value', paiement.id.toString());
    document.getElementById('detail_marcheid').setAttribute('value', paiement.marche_id.toString());
    document.getElementById('num_facture_detail').setAttribute('value', paiement.num_facture);
    document.getElementById('date_facture_detail').setAttribute('value', paiement.date_facture);
    document.getElementById('montant_cfa_detail').setAttribute('value', paiement.montant_cfa.toString());
    document.getElementById('montant_devise_detail').setAttribute('value', paiement.montant_devise.toString());
    document.getElementById('devise_detail').setAttribute('value', paiement.devise.toString());
    document.getElementById('taux_exe_phy_detail').setAttribute('value', paiement.taux_exe_phy.toString());
    document.getElementById('taux_exe_fin_detail').setAttribute('value', paiement.taux_exe_fin.toString());
    document.getElementById('observation_detail').setAttribute('value', paiement.observation);
    document.getElementById('fichier_detail').setAttribute('value', paiement.fichier);


  }

  openEdit(targetModal, paiement: Paiement) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: paiement.id,
      marche_id: paiement.marche_id,
      num_facture: paiement.num_facture,
      date_facture: paiement.date_facture,
      montant_cfa: paiement.montant_cfa,
      montant_devise: paiement.montant_devise,
      devise: paiement.devise,
      taux_exe_phy: paiement.taux_exe_phy,
      taux_exe_fin: paiement.taux_exe_fin,
      observation: paiement.observation,
      fichier: paiement.fichier
    });
  }

  onSave() {
    const editURL = this.base_url+'/updatePaiement/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }

  openDelete(targetModal, paiement: Paiement) {
    this.deleteId = paiement.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removePaiement/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllpaiement();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllpaiement();
  }



}
