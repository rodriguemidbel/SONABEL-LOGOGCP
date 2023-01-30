import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  base_url(){
    return 'http://localhost:3000';
  }

  url(){
    return 'http://localhost/SONABEL/Backend/uploads/';
  }

}
