import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  base_url = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  login(data) : Observable<any>{
    console.log("I am server");
    return this.http.post(this.base_url+'/login',data);
  }

}
