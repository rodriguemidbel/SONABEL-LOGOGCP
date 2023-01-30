import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  base_url = 'http://localhost:3000';
  dossiers : any[];
  planID : number;

  annee : number;

  @Input() deviceXs: boolean;
  topVal = 0;

  title = 'SONABEL-GCP';
  mediaSub: Subscription;
  Today = new Date();

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

 view:number=0;
 add:number=0;
 edit:number=0;
 remove:number=0;
  /*------------------------------------------------*/
  user_id;
  username_id;
  usergroup_id;
  agent_id;

  cpt:number=0;

  constructor(public mediaObserver: MediaObserver, private httpclient : HttpClient, private route : Router) { }

  ngOnInit(): void {

    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      //console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

    this.user_id = localStorage.getItem('userID');
    this.username_id = localStorage.getItem('userName');
    this.usergroup_id = localStorage.getItem('userGroupID');
    this.agent_id = localStorage.getItem('agentID');

    this.findLog();

  }

  findLog(){
        let fonct = 8;
        if(this.usergroup_id && fonct)
        {
          this.httpclient.get<any>(this.base_url+'/recherche/'+this.usergroup_id+'/'+fonct).subscribe(
            beta => {
              //console.log('BETA : ' +beta);
              this.view = beta[0]['view'];
              this.add = beta[0]['add'];
              this.edit = beta[0]['edit'];
              this.remove = beta[0]['remove'];
            }
          );
        }
        /*================================*/
        var ladate = new Date();
        //this.annee= ladate.getFullYear();
        this.annee = 2022;
        if(this.usergroup_id == 5)
        {
            if(this.agent_id)
            {
                this.httpclient.get<any>(this.base_url+'/findDossierByAgent/'+this.agent_id+'/'+this.annee).subscribe(
                  response => {

                    this.dossiers = response;
                    this.cpt = response.length;

                     console.log('Dossier Agent :' +this.dossiers);

                  }
                );
            }
            else
            {

            }
        }
        else
        {
          this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
            response => {
              //console.log(response);
              this.dossiers = response;
              this.cpt = response.length;

            }
          );
        }
        /*================================*/
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }


  getAllDossier(){
   /* let year =  new Date().getFullYear();

    console.log('Agent ID '+this.agent_id);

    if(this.agent_id){
      this.httpclient.get<any>(this.base_url+'/findDossierByAgent/'+this.agent_id+'/'+year).subscribe(
        response => {
          //console.log(response);
          this.dossiers = response;
          this.cpt = response.length;

        }
      );

    }
    else
    {
      this.httpclient.get<any>(this.base_url+'/getAllDossier').subscribe(
        response => {
          //console.log(response);
          this.dossiers = response;
          this.cpt = response.length;

        }
      );

    }*/


  }

  gotoExecution(dossierid){
    this.route.navigate(['/procselection/', + dossierid]);
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

  /*----******/
  onTableDataChange(event: any){
    this.page = event;
    this.getAllDossier();

  }

  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllDossier();
  }


}
