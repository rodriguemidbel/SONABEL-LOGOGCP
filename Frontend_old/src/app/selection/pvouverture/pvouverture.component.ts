import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Ouverture } from '../../models/ouverture.model';

@Component({
  selector: 'app-pvouverture',
  templateUrl: './pvouverture.component.html',
  styleUrls: ['./pvouverture.component.css']
})
export class PvouvertureComponent implements OnInit {

  base_url = 'http://localhost:3000';

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Deliberation';
  mediaSub: Subscription;

  marches : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.dossierid = this.snap.snapshot.params['dossierid'];
   // this.getOneDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getMarche();
      this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        num_ref: [''],
        objet: [''],
        date_sign: [''],
        attributaire: [''],
        montant: [''],
        delai: [''],
        marche: [''],
      } );
  }

  /*---------------------------------*/
  getMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche/'+this.dossierid).subscribe(
      response => {
        console.log(response);
        this.marches = response;

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
    const url = this.base_url+'/createMarche';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, marche: Ouverture) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
    document.getElementById('dossierid_detail').setAttribute('value', marche.dossier_id.toString());


  /*openEdit(targetModal, marche: Ouverture) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: marche.id,
      dossier_id: marche.dossier_id,


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

  openDelete(targetModal, marche: Ouverture) {
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
  /* ngOnDestroy() {
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

   */
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

}
