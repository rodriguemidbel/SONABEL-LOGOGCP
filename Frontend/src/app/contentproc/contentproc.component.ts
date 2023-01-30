import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dossier } from '../models/dossier.model';

@Component({
  selector: 'app-contentproc',
  templateUrl: './contentproc.component.html',
  styleUrls: ['./contentproc.component.css']
})
export class ContentprocComponent{

  base_url = 'http://localhost:3000';

  @Input() deviceXs: boolean;
  topVal = 0;

  nbClaimsWaiting: number;
  state: string;
  subtitle: string;


  dossierid : number;
  dossiers : Dossier;
 //dossiers : any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snap: ActivatedRoute,
              private httpclient: HttpClient){}
 ngOnInit(): void {
  this.dossierid = this.snap.snapshot.params['dossierid'];
  this.getOneDossier();
 }

 getOneDossier(){
  this.httpclient.get<any>(this.base_url+'/getOneDossier/'+this.dossierid).subscribe(
    response => {
      this.dossiers = response;
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
