
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planitem } from '../models/planitem.model';
import { Subject } from 'rxjs';

@Injectable()
export class planitemService {
  annee:number;
  private planitems = [];
  planitemsSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }

  getAllPlanitem(){
    this.annee = 2022;
    this.httpClient.get<any>('http://localhost:3000/findPlanitem/'+this.annee).subscribe(
      response => {
        console.log(response);
        this.planitems = response;
        this.emitplanitemSubject();

      }
    );
  }


    emitplanitemSubject() {
      this.planitemsSubject.next(this.planitems.slice());

    }
}
