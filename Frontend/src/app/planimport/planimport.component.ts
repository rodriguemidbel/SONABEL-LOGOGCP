import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-planimport',
  templateUrl: './planimport.component.html',
  styleUrls: ['./planimport.component.css']
})
export class PlanimportComponent implements OnInit {

  base_url = 'http://localhost:3000';

  //data: [][];
  data: any[] = [];

  convertedJSON: string;

  constructor(private httpclient : HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
  }



  onFileChange(evt: any) {
      const target : DataTransfer =  <DataTransfer>(evt.target);

      if (target.files.length !== 1) throw new Error('Cannot use multiple files');

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
          const bstr: string = e.target.result;

          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

          const wsname : string = wb.SheetNames[0];

          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          //console.log(ws);
          this.data = (XLSX.utils.sheet_to_json(ws));

          this.convertedJSON = JSON.stringify(this.data, undefined, 4)
          /*------*/

        let x = this.data.slice(1);
        //console.log(x);


      };

      reader.readAsBinaryString(target.files[0]);

  }

  onSave(data) : void {

      /*var donnees = JSON.stringify(data);*/
      for(let i = 0; i < data.length; i++){

        this.httpclient
        .post(this.base_url+'/createPlanitem',data[i])
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
      }
      this.toastr.success("Importation et Enregistrement effectuer avec succés !");
      //console.log(data);
  }

}
