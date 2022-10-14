import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerproc',
  templateUrl: './headerproc.component.html',
  styleUrls: ['./headerproc.component.css']
})
export class HeaderprocComponent{
  @Input() deviceXs: boolean;
}
