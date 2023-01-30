import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-headerproc',
  templateUrl: './headerproc.component.html',
  styleUrls: ['./headerproc.component.css']
})
export class HeaderprocComponent{
  @Input() deviceXs: boolean;
  base_url:string;
 /*------------------------------------------------*/
 user_id;
 username;
 usergroup_id;
 agent_id;

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
   private snap: ActivatedRoute, private toastr: ToastrService) { }

 ngOnInit() {
   this.base_url = this.loginService.base_url();
    /*-------------------------*/
    this.user_id = localStorage.getItem('userID');
    this.username = localStorage.getItem('userName');
    this.usergroup_id = localStorage.getItem('userGroupID');
    this.agent_id = localStorage.getItem('agentID');
  /*--------------------------*/
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

 findLogGrant(){
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

 findLogParams(){
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

 findLogFrs(){
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

 findLogPPM(){
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

 findLogLignePPM(){
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

 findLogDossLot(){
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

 findLogSelect(){
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

 findLogCaiss(){
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

 findLogExe(){
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

}
