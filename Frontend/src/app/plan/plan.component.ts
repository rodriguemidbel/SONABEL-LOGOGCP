import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {CurrencyPipe, formatDate} from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  base_url:string;

  //plans : Plan[];
  plans : any[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : number;

  @Input() deviceXs: boolean;


   /*------------------------------------------------*/
   Posts: any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [5,15,25,50,100,150];
    /*------------------------------------------------*/
   public filter: any = '';

   query: string;

    /*--------------*/
  usergroup_id;

  view:number=0;
  add:number=0;
  edit:number=0;
  remove:number=0;

  constructor(private httpclient : HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private loginService: LoginService) {}

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.getPlans();
    this.findLog();
    this.editForm = this.fb.group({
      id: [''],
      annee: [''],
      date_plan: [''],
      statut: ['']
    } );
  }

  findLog(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
        //console.log(response);
        this.usergroup_id = response[0]['usergroup_id'];
        let fonct = 5;

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

  getPlans(){
    this.httpclient.get<any>(this.base_url+'/getAllPlan').subscribe(
      response => {
        console.log(response);
        this.plans = response;

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
    /************************/
    let alpha = f.value['date_plan'];
    f.value['date_plan'] = this.oraDateFormat(alpha);
    console.log(f.value['date_plan']);
    /************************/
    const url = this.base_url+'/createPlan';
    this.httpclient.post(url, f.value)
      .subscribe((result) => {
        this.toastr.success("Enregistrement effectuer avec succés");
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, plan: Plan) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   document.getElementById('id_detail').setAttribute('value', plan.id.toString());
   document.getElementById('annee_detail').setAttribute('value', plan.annee.toString());
   document.getElementById('date_detail').setAttribute('value', plan.date_plan.toDateString());
   document.getElementById('statut_detail').setAttribute('value', plan.statut)

  }

  openEdit(targetModal, plan: Plan) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: plan.id,
      annee: plan.annee,
      date_plan: this.oraDateFormatFr(plan.date_plan),
      statut: plan.statut

    });
    console.log(plan.date_plan);
    console.log(this.oraDateFormatFr(plan.date_plan));
  }

  onSave() {
    /************************/
    let alpha = this.editForm.value.date_plan;
    this.editForm.value.date_plan = this.oraDateFormat(alpha);
    console.log(this.editForm.value.date_plan);
    /************************/
    const editURL = this.base_url+'/updatePlan/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpclient.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning("Modification effectuer avec succés");
      });
  }

  openDelete(targetModal, plan: Plan) {
    this.deleteId = plan.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.base_url+'/removePlan/' +this.deleteId;
    this.httpclient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

   /*----******/
   onTableDataChange(event: any){
    this.page = event;
    this.getPlans();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPlans();
  }

  oraDateFormat(x){
    /************Insertion dans la BD Oracle************/
    let y = new Date(x);
    let z = formatDate(y,'dd/MMM/yyyy', 'eng');
    return z;
    /************************/
  }

  oraDateFormatFr(x){
    /************Affichage de la date************/
    let y = new Date(x);
    let z = formatDate(y,'yyyy-MM-dd', 'fr');
    return z;
    /************************/
  }



}
