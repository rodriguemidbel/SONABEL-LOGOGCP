import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvisComponent } from './avis/avis.component';
import { CaminvComponent } from './caminv/caminv.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { CamrapportComponent } from './camrapport/camrapport.component';
import { CautionComponent } from './caution/caution.component';
import { CourrierComponent } from './courrier/courrier.component';
import { PubavisComponent } from './pubavis/pubavis.component';
import { PubresultatsComponent } from './pubresultats/pubresultats.component';
import { ProceverbComponent } from './proceverb/proceverb.component';
import { OuvertureComponent } from './ouverture/ouverture.component';
import { OffreComponent } from './offre/offre.component';
import { MarcheComponent } from './marche/marche.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { DeliberationComponent } from './deliberation/deliberation.component';
import { PvouvertureComponent } from './pvouverture/pvouverture.component';
import { ResultatComponent } from './resultat/resultat.component';
import { ScaminvComponent } from './scaminv/scaminv.component';
import { Scamrapport } from '../models/scamrapport.model';
import { ScamrapportComponent } from './scamrapport/scamrapport.component';
import { HeaderprocComponent } from '../headerproc/headerproc.component';
import { ProcselectionComponent } from '../procselection/procselection.component';
import { ContentprocComponent } from '../contentproc/contentproc.component';
import { SelecMenuComponent } from '../selec-menu/selec-menu.component';



@NgModule({
  declarations: [
    HeaderprocComponent,
    ProcselectionComponent,
    ContentprocComponent,
    SelecMenuComponent,

    AvisComponent,
    CaminvComponent,
    ResultatComponent,
    ScaminvComponent,

    CamrapportComponent,
    ScamrapportComponent,
    CautionComponent,
    CourrierComponent,
    PubavisComponent,
    PubresultatsComponent,
    ProceverbComponent,
    PvouvertureComponent,
    OuvertureComponent,
    OffreComponent,
    OuvertureComponent,
    MarcheComponent,
    AnalyseComponent,
    DeliberationComponent,


    FilterPipe,
    SortPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatPaginatorModule,

  ],
   exports: [HeaderprocComponent,
             ProcselectionComponent,
             ContentprocComponent,
             SelecMenuComponent,
  ]
})
export class SelectionModule { }
