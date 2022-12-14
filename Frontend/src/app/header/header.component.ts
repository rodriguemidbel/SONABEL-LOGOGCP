import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  @Input() deviceXs: boolean;

  base_url:string;
  /*------------------------------------------------*/
  usergroup_id;

  view_user:number=0;
  view_grant:number=0;
  view_parameter:number=0;
  view_frs:number=0;
  view_ppm:number=0;
  view_ligne_ppm:number=0;
  view_doss_lot:number=0;
  view_select:number=0;
  view_caiss:number=0;
  view_exe:number=0;

 constructor(private httpclient: HttpClient,
   private router: Router,  private loginService: LoginService,
   private route: ActivatedRoute,
   private snap: ActivatedRoute, private toastr: ToastrService){ }

 ngOnInit() {
   this.base_url = this.loginService.base_url();
   this.findLogUser();
   this.findLogGrant();
   this.findLogParams();
   this.findLogFrs();
   this.findLogPPM();
   this.findLogLignePPM();
   this.findLogDossLot();
   this.findLogSelect();
   this.findLogCaiss();
   this.findLogExe();
 }

 findLogUser(){
    this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
      response => {
       this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 1;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_user = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogGrant(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 2;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_grant = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogParams(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 3;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_parameter = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogFrs(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 4;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_frs = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogPPM(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 5;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_ppm = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogLignePPM(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 6;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_ligne_ppm = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogDossLot(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 7;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_doss_lot = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogSelect(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 8;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_select = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogCaiss(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 9;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_caiss = beta[0]['view'];
           }
         );
       }
     }
   );
 }

 findLogExe(){
  this.httpclient.get<any>(this.base_url+'/findLog').subscribe(
    response => {
     this.usergroup_id = response[0]['usergroup_id'];
       let fonct = 10;
       if(this.usergroup_id && fonct)
       {
         this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
           beta => {
             this.view_exe = beta[0]['view'];
           }
         );
       }
     }
   );
 }

}
