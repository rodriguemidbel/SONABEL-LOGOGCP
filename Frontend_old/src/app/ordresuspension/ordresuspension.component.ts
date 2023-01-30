import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Ordresuspension } from '../models/ordresuspension.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-ordresuspension',
  templateUrl: './ordresuspension.component.html',
  styleUrls: ['./ordresuspension.component.css']
})
export class OrdresuspensionComponent implements OnInit {
  base_url : string;

  url = "http://localhost/LOGOGCP-SONABEL/Backend/uploads/";

  filename: string;

  ordres : any[]
  dossiers: any[];

  marches : any[];

  closeResult : string;
  editForm : FormGroup;
  annee : number;
  deleteId : number;

  ordreId : number;

  filteredString ='';

  @Input() deviceXs: boolean;

  brandForm:FormGroup;
  isSubmitted = false;

  images;

  ordre: string;
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
    this.getAllOrdre();

    this.getAllMarche();

    this.editForm = this.fb.group({
      id: [''],
      marche_id: [''],
      ref: [''],
      date_notif: [''],
      date_suspension: [''],
      ordre: ['']

    } );

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.filename =  file.name;
    }
  }


  getAllOrdre(){
       this.httpclient.get<any>(this.base_url+'/getAllOrdresus').subscribe(
      response => {
        console.log(response);
        this.ordres = response;


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
    const url = this.base_url+'/createOrdresus';

    f.value['ordre'] = this.filename;

    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    //this.modalService.dismissAll(); //dismiss the modal
    /*-----------------*/
    console.log("Nom ordre upload : " +this.ordre);
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



  openDetails(targetModal, ordre: Ordresuspension) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('detail_id').setAttribute('value', ordre.id.toString());
    document.getElementById('detail_marcheid').setAttribute('value', ordre.marche_id.toString());
    document.getElementById('ref_detail').setAttribute('value', ordre.ref);
    document.getElementById('date_suspension_detail').setAttribute('value', ordre.date_suspension);
    document.getElementById('date_notif_detail').setAttribute('value', ordre.date_notif);
    document.getElementById('ordre_detail').setAttribute('value', ordre.ordre);

  }

  openEdit(targetModal, ordre: Ordresuspension) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: ordre.id,
      marche_id: ordre.marche_id,
      ref: ordre.ref,
      date_suspension: ordre.date_suspension,
      date_notif: ordre.date_notif,
      ordre: ordre.ordre

    });
  }

  getAllMarche(){
    this.httpclient.get<any>(this.base_url+'/getAllMarche').subscribe(
      response => {
        console.log(response);
        this.marches = response;


      }
    );
  }

  onSave() {
    const editURL = this.base_url+'/updateOrdresus/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }

  openDelete(targetModal, ordre: Ordresuspension) {
    this.deleteId = ordre.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removeOrdresus/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllOrdre();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllOrdre();
  }

}
