import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Avenant } from '../models/avenant.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-avenant',
  templateUrl: './avenant.component.html',
  styleUrls: ['./avenant.component.css']
})
export class AvenantComponent implements OnInit {
  base_url : string;

  avenants : any[]
  dossiers: any[];

  marches : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  avenantId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  isSubmitted = false;

  images;

  avenant: string;
   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;


  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService, private snap: ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {

    this.base_url = this.loginService.base_url();
    this.getAllavenant();

    this.getAllMarche();

    this.editForm = this.fb.group({
      id: [''],
      marche_id: [''],
      num_avenant: [''],
      date_avenant: [''],
      objet_avenant:[''],
      motif_avenant:[''],
      montant_avenant: [''],
      delai_avenant: ['']
    } );

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.avenant = file.filename;
    }
  }

  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        console.log(response);
        this.marches = response;


      }
    );
  }

  getAllavenant(){
       this.httpclient.get<any>(this.base_url+'/getAllAvenant').subscribe(
      response => {
        console.log(response);
        this.avenants = response;


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
    const url = this.base_url+'/createAvenant';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    console.log("Nom avenant upload : " +this.avenant);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  openDetails(targetModal, avenant: Avenant) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('detail_id').setAttribute('value', avenant.id.toString());
    document.getElementById('detail_marcheid').setAttribute('value', avenant.marche_id.toString());
    document.getElementById('num_avenant_detail').setAttribute('value', avenant.num_avenant);
    document.getElementById('date_avenant_detail').setAttribute('value', avenant.date_avenant);
    document.getElementById('objet_avenant_detail').setAttribute('value', avenant.objet_avenant);
    document.getElementById('motif_avenant_detail').setAttribute('value', avenant.motif_avenant);
    document.getElementById('montant_avenant_detail').setAttribute('value', avenant.montant_avenant.toString());
    document.getElementById('delai_avenant_detail').setAttribute('value', avenant.delai_avenant.toString());


  }

  openEdit(targetModal, avenant: Avenant) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: avenant.id,
      marche_id: avenant.marche_id,
      num_avenant: avenant.num_avenant,
      date_avenant: avenant.date_avenant,
      objet_avenant: avenant.objet_avenant,
      motif_avenant: avenant.motif_avenant,
      montant_avenant: avenant.montant_avenant,
      delai_avenant: avenant.delai_avenant
    });
  }

  onSave() {
    const editURL = this.base_url+'/updateAvenant/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }

  openDelete(targetModal, avenant: Avenant) {
    this.deleteId = avenant.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeAvenant/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllavenant();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllavenant();
  }


}
