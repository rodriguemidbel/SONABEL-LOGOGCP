import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Dossier } from '../models/dossier.model';
import {finalize, map,startWith} from 'rxjs/operators';
import { Planitem } from '../models/planitem.model';




@Component({
  selector: 'app-dossierppm',
  templateUrl: './dossierppm.component.html',
  styleUrls: ['./dossierppm.component.css']
})
export class DossierppmComponent implements OnInit {

  base_url = 'http://localhost:3000';

  planitems : any[];
  dossiers : any[];
  lots : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  dossierId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup[];
  isSubmitted = false;

  images;

  dossier: string;
   /*------------------------*/
     pageIndex:number = 0;
     pageSize:number = 5;
     lowValue:number = 0;
     highValue:number = 5;
   /*------------------------------------------------*/
   displayedColumns: string[] = ['id', 'annee', 'montant_estime', 'designation', 'mode', 'delai_exe', 'type','localisation', 'action(s)'];
   dossierSubsciption: Subscription;
   /*------------------------------------------------*/


   selected: number;

  /*---*/
  options: string[] =['Angular', 'Angular JS', 'REACT', 'Vue', 'Python', 'Node', 'Express'];

  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'REACT'},
    {name: 'Vue JS'},
    {name: 'Python'},
    {name: 'Node'},
    {name: 'Express'},
  ]
  filteredOptions: Observable<string[]>;
  /*---*/
  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  /*--*/

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute)
    {}

  ngOnInit(){

    this.getAllPlanitems();
    this.getAllDossier();
    /*---*/
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }

  myControl = new FormControl();

  displayFn(subject){
    return subject ? subject : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().includes(filterValue)
      );
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.dossier = file.filename;
    }
  }
  /*----*/

  onFileSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        const upload$ = this.httpclient.post(this.base_url+"/file", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    }
}

cancelUpload() {
this.uploadSub.unsubscribe();
this.reset();
}

reset() {
this.uploadProgress = null;
this.uploadSub = null;
}

  /*----*/

  getAllDossier(){
   var ladate = new Date();
   this.annee= ladate.getFullYear();
    this.httpclient.get<any>(this.base_url+'/findDossier/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.dossiers = response;



      }
    );
  }

  getAllPlanitems(){
    //this.annee = 2022;
    var ladate = new Date();
    this.annee= ladate.getFullYear();

    this.httpclient.get<any>(this.base_url+'/findPlanitem/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.planitems = response;



      }
    );
  }


  onSubmit(f: NgForm) {
    const url = this.base_url+'/createDossier';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    console.log("Nom dossier upload : " +this.dossier);
    const formData = new FormData();
    formData.append('file', this.images);
    //console.log(formData);
    this.httpclient.post<any>(this.base_url+'/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //this.toastr.info("Fichier uploader : "+f.value.json());
    this.modalService.dismissAll(); //dismiss the modal
  }




  onSave() {
    const editURL = this.base_url+'/updateDossier/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }



  onDelete() {
    const deleteURL = this.base_url+'/removeDossier/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  /*------------------------*/
 /* reset(){
    this.brandForm.reset();
    this.brandForm.controls.is_active.setValue(1);
    this.isSubmitted = false;


  }

  edit(id){
    if(id){
      const brand = this.lots.find(x => x.id === id);
        if (!brand) return;
        brand.isReading = true;

      this.httpclient.get('http://localhost:3000/getOneLot/'+id).subscribe((result) => {
        Object.keys(this.brandForm.controls).forEach(key => {
          this.brandForm.controls[key].setValue(result[key]);
        });
        brand.isReading = false;
        this.toastr.warning("Donnéee chargée avec succés");
        //alert('Edit data loaded successfully');
      });
    }
  }*/

  delete(id){
    var result = confirm("Voulez-vous vraiment supprimmer cette donnée?");
    if(id && result){
      const brand = this.lots.find(x => x.id === id);
        if (!brand) return;
        brand.isDeleting = true;

      this.httpclient.delete('http://localhost:3000/removeLot/'+id).subscribe(() => {
        brand.isReading = false;
        //this.reset();
        this.toastr.success("Donnée supprimer effectuer avec succés");
        //alert('Removed successfully');
      });
    }
  }

  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }
      this.pageIndex = event.pageIndex;
  }





}
