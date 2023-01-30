import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dospieceService } from './dospiece.service';

@Component({
  selector: 'app-dospiece',
  templateUrl: './dospiece.component.html',
  styleUrls: ['./dospiece.component.css']
})


export class DospieceComponent implements OnInit {

  base_url = 'http://localhost:3000';


  _courselist: course[];
  _student: student;
  _studentlist:student[] = [];
  uniquekey: number = 0;

  constructor(private service: dospieceService, private fb : FormBuilder,private httpclient : HttpClient) { }

  ngOnInit(): void {

    this.getcourses();
    this._student = new student();

  }





  getcourses(){
    this._courselist = [
      {id:1, name:"C#", isSelected:false},
      {id:2, name:"ASP .NET", isSelected:false},
      {id:3, name:"SQL", isSelected:false},
      {id:4, name:"MVC", isSelected:false},
      {id:5, name:"JQUERY", isSelected:false},
      {id:6, name:"ANGULAR", isSelected:false},

    ]
  }

  onchange(){
    console.log(this._courselist);
  }

  onsubmit(){

    let index = this._studentlist.findIndex(x=>x.id == this._student.id);

    this._student.courseid = this._courselist.filter(x=>x.isSelected == true).map(x=>x.id).join(",").toString();
    /*---*/
    this._student.coursename = this._courselist.filter(x=>x.isSelected == true).map(x=>x.name).join(",").toString();

    if(index ==-1)
    {
      /*--------------Create---------------*/
      this.uniquekey = this.uniquekey +1;
      this._student.id = this.uniquekey;
      this._studentlist.push(this._student);

    }else
    {
      this._studentlist[index] = this._student;
    }

    this._student = new student();
    this.getcourses();
  }

  edit(item: student)
  {
    let selectedcourseidlist = item.courseid.split(",");
    for(let i =0; i < selectedcourseidlist.length; i++){
      this._courselist.filter(x=>x.id==Number(selectedcourseidlist[i])).map(x=>x.isSelected=true);

    }
    this._student.name = item.name;
    this._student.id = item.id;
  }



}

class course{
  id: number;
  name: string;
  isSelected:boolean;
}

class student{
  id: number;
  name: string;
  courseid: string;
  coursename:string;
}
