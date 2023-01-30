import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Camrapport } from '../../models/camrapport.model';

@Component({
  selector: 'app-camrapport',
  templateUrl: './camrapport.component.html',
  styleUrls: ['./camrapport.component.css']
})
export class CamrapportComponent implements OnInit {

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : any[];

  title = 'Rapport CAM';
  mediaSub: Subscription;

  camrapports : any[];
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
    this.getOneDossier();

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })

    this.getCamrapport();
      this.editForm = this.fb.group({
        id: [''],
        dossier_id: [''],
        date_cam_rap: [''],
        rapport_cam: ['']
      } );
  }

    /*---------------------------------*/
    getCamrapport(){
      this.httpclient.get<any>('http://192.168.215.131:3000/getAllCamrapport/'+this.dossierid).subscribe(
        response => {
          console.log(response);
          this.camrapports = response;

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
    const url = 'http://192.168.215.131:3000/createCamrapport';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, camrapport: Camrapport) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('dossierid_detail').setAttribute('value', camrapport.dossier_id.toString());
    document.getElementById('datcam_detail').setAttribute('value', camrapport.date_cam_rap.toString());
    document.getElementById('heurcam_detail').setAttribute('value', camrapport.rapport_cam.toString());

  }

  openEdit(targetModal, camrapport: Camrapport) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: camrapport.id,
      dossier_id: camrapport.dossier_id,
      date_cam_rap: camrapport.date_cam_rap,
      rapport_cam: camrapport.rapport_cam,


    });
  }

  onSave() {
    const editURL = 'http://192.168.215.131:3000/updateCamrapport/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, camrapport: Camrapport) {
    this.deleteId = camrapport.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://192.168.215.131:3000/removeCamrapport/' +this.deleteId;
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
    this.httpclient.get<any>('http://192.168.215.131:3000/getOneDossier/'+this.dossierid).subscribe(
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



}
