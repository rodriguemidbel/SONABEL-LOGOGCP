import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Lot } from '../models/lot.model';
import { LoginService } from '../services/login.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {

  base_url:string;

  planitems : any[]
  dossiers : any[];
  lots : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  dossierId : number;
  numero_doss : string;
  intitule_doss: string;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm: FormGroup;
  logForm: FormGroup;
  isSubmitted = false;
  brandList;
  /*---------------------*/

  images;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

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
    pieces: any[];

   selected: number;

   num_lot:number;
   intitule_lot:number;
   montant_lot:number;
   montant_vente:number;
   statut:string;
   /*-----------------*/
   usergroup_id;
   user_id:number;
   agent_id:number;
   agent_name:string;

   current_date:string;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private _fb:FormBuilder, private router: Router,
    private toastr: ToastrService, private snap: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.dossierId = this.snap.snapshot.params['dossierId'];

    this.loadLots();
    this.findLog();

     /*---------------*/
     this.brandForm = this._fb.group({
      id: [0],
      dossier_id: ['', Validators.required],
      num_lot: ['', Validators.required],
      intitule_lot: ['', Validators.required],
      montant_lot: ['', Validators.required],
      montant_vente: ['', Validators.required],
      statut: ['']
    });
    /*-----------------*/
    this.logForm = this.fb.group({
      id: [0],
      user_id: ['', Validators.required],
      action: ['', Validators.required]
    });
     /*---------------*/
     let y = new Date();
     this.current_date = formatDate(y,'dd/MMM/yyyy  h:mm:ss a', 'eng');

    this.statut = "Valider";
  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        this.agent_id = response[0]['agent_id'];
        this.agent_name = response[0]['user_name'];
        this.user_id = response[0]['user_id'];
        let fonct = 7;
      });
  }

  /*--------------------LOT----------*/
  get _fc() { return this.brandForm.controls; }


  loadLots() {
      /*-------------------------------------*/
      this.httpclient.get<any>(this.base_url+'/getOneDossier/'+this.dossierId).subscribe(
        response => {
          this.numero_doss = response['numero_doss'];
          this.intitule_doss = response['intitule_doss'];
        }
      );
      /*------------------------------------*/
      this.httpclient.get<any>(this.base_url+'/findLot/' +this.dossierId).subscribe(
        response => {
          this.lots = response;
        }
      );
  }

  getAllLot(){
    this.httpclient.get<any>(this.base_url+'/findLot/' +this.dossierId).subscribe(
      response => {
        console.log('Dossier Id : ',this.dossierId);
        //console.log(response);
        this.lots = response;
      }
    );
  }

  deleteLot(id){
    //this.toastr.warning("Suppression effectuer avec succés : " + id);
    var result = confirm("Voulez-vous vraiment supprimmer cette donnée?");
    if(id && result){
      const deleteURL = this.base_url+'/removeLot/'+id;
      this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.toastr.warning("Suppression effectuer avec succés");
        this.getAllLot();


      });

          /* -----------------*/
            this.logForm.patchValue({
            user_id: this.user_id,
            action: 'Suppression du lot ID : '+id+' par '+this.agent_name+' | '+this.current_date
          });
          //console.log(this.brandForm.value);
          this.httpclient.post(this.base_url+'/createLog', this.logForm.value).subscribe(() => {
          });
        /* -----------------*/

    }
  }

  /*===============================================*/

  save(){
    this.isSubmitted = true;
    if(this.brandForm.invalid) {
        return;
    } else{
      let id = this.brandForm.controls.id.value;
      /*--------------------------*/
      let numero = this.brandForm.controls.num_lot.value;
      let intitule = this.brandForm.controls.intitule_lot.value;
      /*--------------------------*/
      if(!id){
        console.log(this.brandForm.value);
        this.httpclient.post(this.base_url+'/createLot', this.brandForm.value).subscribe(() => {
          //alert('Created successfully');
          this.toastr.success("Enregistrement effectuer avec succés");
          this.getAllLot();
          this.reset();
        });
              /* -----------------*/
                this.logForm.patchValue({
                  user_id: this.user_id,
                  action: 'Création du lot : '+numero+' '+ intitule+' par '+this.agent_name+' | '+this.current_date
                });
                //console.log(this.brandForm.value);
                this.httpclient.post(this.base_url+'/createLog', this.logForm.value).subscribe(() => {
                });
              /* -----------------*/
      } else {
        this.httpclient.patch(this.base_url+'/updateLot/'+id, this.brandForm.value).subscribe(() => {
          //alert('Updated successfully');
          this.toastr.warning("Modification effectuer avec succés");
          this.getAllLot();
          this.reset();
        });
            /* -----------------*/
             this.logForm.patchValue({
              user_id: this.user_id,
              action: 'Modification du lot : '+numero+' '+ intitule+' par '+this.agent_name+' | '+this.current_date
            });
            //console.log(this.brandForm.value);
            this.httpclient.post(this.base_url+'/createLog', this.logForm.value).subscribe(() => {
            });
          /* -----------------*/

      }

    }
  }



  edit(lot: Lot){

    if(lot.id){
      const brand = this.lots.find(x => x.id === lot.id);
        if (!brand) return;
        brand.isReading = true;

        this.brandForm.patchValue( {
          id: lot.id,
          dossier_id: lot.dossier_id,
          num_lot: lot.num_lot,
          intitule_lot: lot.intitule_lot,
          montant_lot: lot.montant_lot,
          montant_vente: lot.montant_vente,
          statut: lot.statut

        });
        brand.isReading = false;
        this.toastr.info("Donnéee chargée avec succés");
    }
    //this.toastr.info("Donnéee chargée avec succés : " + lot.id);
  }

  reset(){
    this.brandForm.controls['num_lot'].setValue('');
    this.brandForm.controls['intitule_lot'].setValue('');
    this.brandForm.controls['montant_lot'].setValue('');
    this.brandForm.controls['montant_vente'].setValue('');
    /*----*/
    this.router.navigate(['/lot/'+this.dossierId]);
    this.isSubmitted = false;
  }

  annuler()
  {
    this.router.navigate(['/dossier']);
  }

}
