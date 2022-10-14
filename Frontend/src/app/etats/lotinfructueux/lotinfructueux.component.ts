import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lotinfructueux',
  templateUrl: './lotinfructueux.component.html',
  styleUrls: ['./lotinfructueux.component.css']
})
export class LotinfructueuxComponent implements OnInit {
  base_url:string;
  lots : any[];

  query: string;

  constructor(private httpclient : HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder, private _fb:FormBuilder, private router: Router,
    private toastr: ToastrService, private snap: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();

    this.getAllLot();
  }

  getAllLot(){
    var ladate = new Date();
    let annee= ladate.getFullYear();

    this.httpclient.get<any>(this.base_url+'/findLotInfruct/'+annee).subscribe(
      response => {
        //console.log(response);
        this.lots = response;
      }
    );
  }

}
