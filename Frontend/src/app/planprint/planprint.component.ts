import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-planprint',
  templateUrl: './planprint.component.html',
  styleUrls: ['./planprint.component.css']
})
export class PlanprintComponent implements OnInit {

  base_url = 'http://localhost:3000';
  planitems : any[];
  annee : number;

  @Input() deviceXs: boolean;
  /*designation = '';
  gestionnaire = '';
  type = '';*/
  //localisation = '';
  //searchIntitule = '';

  filteredString = '';


  constructor(private httpclient : HttpClient, private snap: ActivatedRoute) { }

  ngOnInit(): void {

    this.annee = this.snap.snapshot.params['annee'];
    this.getAllPlanitem();
  }

  getAllPlanitem(){
   this.httpclient.get<any>(this.base_url+'/findPlanitem/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.planitems = response;

      }
    );
  }

  onIntitulerFilter(){
    /*this.searchIntitule = this.designation;
    this.searchIntitule = this.gestionnaire;
    this.searchIntitule = this.type;*/
    //this.searchIntitule = this.localisation;
  }

 onIntitulerClearFilter(){
 //this.searchIntitule ='';
 /*  this.designation = '';
  this.gestionnaire = '';
  this.type = '';*/
  //this.localisation = '';
 }



}
