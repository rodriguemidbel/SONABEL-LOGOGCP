import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  base_url : string;

  bookForm  : FormGroup;
  brandForm:FormGroup;
  alert : boolean = false;
  users : any[];

  userid:number;
   /*-----*/
  globalMsgDisplayed: string;
  fgLogin: FormGroup;
  isWaiting: boolean;

  unitErrorMsg = {
    username: '',
    password: ''
  };

  unitErrorMsgDefinition = {
    username: { required: 'Nom d\'utilisateur requis.'},
    password: { required: 'Mot de passe requis.'}
  }

  /*------------*/
  constructor(private authService: AuthServiceService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private httpclient: HttpClient,
              private loginService:LoginService  ) { }

  ngOnInit(): void {
    this.base_url = this.loginService.base_url();
    this.fgLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    /*---------------*/
    this.brandForm = this.fb.group({
      id: [0],
      user_id: ['', Validators.required],
      action: ['', Validators.required]
    });

    this.handleValueChanges();
  }

  handleValueChanges() {
    this.fgLogin.valueChanges
          .subscribe(val => {
            this.validateForm();
          });
  }
  /*initForm(){
    this.bookForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }*/
  loginProces(){
     if(this.fgLogin.valid){
       this.authService.login(this.fgLogin.value).subscribe(result=>{
        this.users = result;
        if(Object.keys(this.users['user']).length > 0){
          /*++++++++++*/
          this.userid = this.users['user'][0]['userID'];
          //console.log(this.users['user']);
          this.brandForm.patchValue({
            user_id: this.userid,
            action: 'Connection au syst??me'
          });
          console.log(this.brandForm.value);
           /*++++++++++*/
           this.httpclient.post(this.base_url+'/createLog', this.brandForm.value).subscribe(() => {
            this.router.navigate(['home']);
          });
          //this.router.navigate(['home']);
        }else{
          this.toastr.error("Nom d'utilisateur ou mot de passe incorrecte");
          //this.alert = true;
        }

       })
     }
  }
  closeAlert(){
    this.alert=false;
  }

  cleanForm() {
    this.fgLogin.controls['username'].setValue('');
    this.fgLogin.controls['password'].setValue('');
    this.globalMsgDisplayed = '';
  }

  keyDownHandler(event) {
    // Enter key code
    if (event.code == 'Enter') {
       this.loginProces();
     }
  }

  //*********FORM VALIDATION**********
  validateForm() {
    if (!this.fgLogin) {
      return;
    }

    const fg = this.fgLogin;

    for (let elt in this.unitErrorMsg) {
      this.unitErrorMsg[elt] = "";
      const control = fg.controls[elt];

      if (control && control.dirty && !control.valid) {
        for (let error in control.errors) {
          this.unitErrorMsg[elt] +=
            this.unitErrorMsgDefinition[elt][error] + " ";
        }
      }
    }
  }


}
