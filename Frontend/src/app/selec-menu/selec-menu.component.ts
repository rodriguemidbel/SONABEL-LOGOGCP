import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selec-menu',
  templateUrl: './selec-menu.component.html',
  styleUrls: ['./selec-menu.component.css']
})


export class SelecMenuComponent implements OnInit {

  subtitle: string;
  panelOpenState = false;

  dossierid : number;

  constructor(public mediaObserver: MediaObserver,
    private router: Router,
    private route: ActivatedRoute,
    private snap: ActivatedRoute,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dossierid = this.snap.snapshot.params['dossierid'];
  }

  handleSideMenuClick(event) {
    const target =  event.currentTarget; // event.target || event.srcElement ||
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    switch (value) {
      case 'pubavis':
        this.subtitle = 'Publication avis bordereau';
        this.router.navigate(['/pubavis/', + this.dossierid]);
        break;
      case 'avis':
        this.subtitle = 'Publication avis ';
        this.router.navigate(['/avis/', + this.dossierid]);
        break;
      case 'caminv':
          this.subtitle = 'Invitation CAM ';
          this.router.navigate(['/caminv/', + this.dossierid]);
          break;
      case 'scaminv':
            this.subtitle = 'Invitation SCAM ';
            this.router.navigate(['/scaminv/', + this.dossierid]);
            break;
      case 'offre':
              this.subtitle = 'Offre ';
              this.router.navigate(['/offre/', + this.dossierid]);
            break;
      case 'proceverb':
              this.subtitle = 'PV ouverture ';
              this.router.navigate(['/proceverb/', + this.dossierid]);
            break;
      case 'deliberation':
              this.subtitle = 'Déliberation ';
              this.router.navigate(['/deliberation/', + this.dossierid]);
            break;
      case 'analyse':
              this.subtitle = 'Rapport d’analyse';
              this.router.navigate(['/analyse/', + this.dossierid]);
            break;
      case 'pubresultat':
              this.subtitle = 'Publication résultat bordereau';
              this.router.navigate(['/pubresultat/', + this.dossierid]);
            break;
      case 'resultat':
              this.subtitle = 'Publication résultat ';
              this.router.navigate(['/resultat/', + this.dossierid]);
            break;
      case 'caution':
              this.subtitle = 'Caution de soumission ';
              this.router.navigate(['/caution/', + this.dossierid]);
            break;
      case 'marche':
              this.subtitle = 'Marché ';
              this.router.navigate(['/marche/', + this.dossierid]);
            break;
      case 'courrier':
              this.subtitle = 'Courriers ';
              this.router.navigate(['/courrier/', + this.dossierid]);
            break;
      default :
       this.router.navigate(['/procselection/', + this.dossierid]);
      break;

    }
  }

}
