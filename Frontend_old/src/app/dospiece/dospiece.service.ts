import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dospieceService {

  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get('https://localhost:3000/getAllDossier')
      .pipe(
        map((response:[]) => response.map(item => item['numero_doss']))
      )
  }
}
