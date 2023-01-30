import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PlanComponent } from './plan/plan.component';
import { PlanitemComponent } from './planitem/planitem.component';

import { ProcselectionComponent } from './procselection/procselection.component';
import { HeaderprocComponent } from './headerproc/headerproc.component';
import { ContentprocComponent } from './contentproc/contentproc.component';
import { SelecMenuComponent } from './selec-menu/selec-menu.component';

import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { ModeComponent } from './mode/mode.component';
import { BudgetComponent } from './budget/budget.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UserComponent } from './user/user.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AvisComponent } from './selection/avis/avis.component';
import { PlanprintComponent } from './planprint/planprint.component';
import {NgxPrintModule} from 'ngx-print';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { CaminvComponent } from './selection/caminv/caminv.component';
import { ScaminvComponent } from './selection/scaminv/scaminv.component';
import { OffreComponent } from './selection/offre/offre.component';
import { CamrapportComponent } from './selection/camrapport/camrapport.component';
import { ScamrapportComponent } from './selection/scamrapport/scamrapport.component';
import { ResultatComponent } from './selection/resultat/resultat.component';
import { MarcheComponent } from './selection/marche/marche.component';
import { OrdreComponent } from './ordre/ordre.component';
import { CourrierComponent } from './selection/courrier/courrier.component';
import { CautionComponent } from './selection/caution/caution.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { LocalisationComponent } from './localisation/localisation.component';
import { TypeComponent } from './type/type.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { PlanimportComponent } from './planimport/planimport.component';
import { DossierComponent } from './dossier/dossier.component';
import { DossierppmComponent } from './dossierppm/dossierppm.component';
import { VenteComponent } from './vente/vente.component';
import { CaisseComponent } from './caisse/caisse.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ModepaiementComponent } from './modepaiement/modepaiement.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TypcreditComponent } from './typcredit/typcredit.component';
import { ImmobilisationComponent } from './immobilisation/immobilisation.component';
import { CreditComponent } from './credit/credit.component';
import { AgentComponent } from './agent/agent.component';
import { DossiertechComponent } from './dossiertech/dossiertech.component';
import { PlanitemexeComponent } from './planitemexe/planitemexe.component';
import { OuvertureComponent } from './selection/ouverture/ouverture.component';
import { AnalyseComponent } from './selection/analyse/analyse.component';

import { PvouvertureComponent } from './selection/pvouverture/pvouverture.component';
import { DeliberationComponent } from './selection/deliberation/deliberation.component';
import { ProceverbComponent } from './selection/proceverb/proceverb.component';
import { SiteComponent } from './site/site.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { DospieceComponent } from './dospiece/dospiece.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEng from '@angular/common/locales/en';
import { TypreceptionComponent } from './typreception/typreception.component';
import { ReceptionComponent } from './reception/reception.component';
import { OrdresuspensionComponent } from './ordresuspension/ordresuspension.component';
import { OrdrerepriseComponent } from './ordrereprise/ordrereprise.component';
import { AvenantComponent } from './avenant/avenant.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TraitementdossierComponent } from './etats/traitementdossier/traitementdossier.component';
import { SuivitdossierComponent } from './etats/suivitdossier/suivitdossier.component';
import { QuillModule } from 'ngx-quill'
import { PubavisComponent } from './selection/pubavis/pubavis.component';
import { PubresultatsComponent } from './selection/pubresultats/pubresultats.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LotComponent } from './lot/lot.component';

import {ProgressBarModule} from "angular-progress-bar";
import { TauxglobalComponent } from './etats/tauxglobal/tauxglobal.component';
import { TauxdetailsComponent } from './etats/tauxdetails/tauxdetails.component';
import { TauxagentComponent } from './etats/tauxagent/tauxagent.component';
import { DossierinfructueuxComponent } from './etats/dossierinfructueux/dossierinfructueux.component';
import { LotinfructueuxComponent } from './etats/lotinfructueux/lotinfructueux.component';
import { EtatventeComponent } from './etats/etatvente/etatvente.component';
import { VenteDossierComponent } from './etats/vente-dossier/vente-dossier.component';
import { VenteDossierProcedureComponent } from './etats/vente-dossier-procedure/vente-dossier-procedure.component';
import { PaiementDossierComponent } from './etats/paiement-dossier/paiement-dossier.component';
import { PaiementDossierProcedureComponent } from './etats/paiement-dossier-procedure/paiement-dossier-procedure.component';
import { DossierAgentComponent } from './etats/dossier-agent/dossier-agent.component';
import { MarcheExecutionComponent } from './etats/marche-execution/marche-execution.component';
import { DeviseComponent } from './devise/devise.component';
import { FonctionaliteComponent } from './fonctionalite/fonctionalite.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { SuiviFactureComponent } from './etats/suivi-facture/suivi-facture.component';
import { SuiviMarcheComponent } from './etats/suivi-marche/suivi-marche.component';
import { ExecutionMarcheComponent } from './etats/execution-marche/execution-marche.component';
import { VenteAddComponent } from './vente-add/vente-add.component';
import { DossierModeComponent } from './etats/dossier-mode/dossier-mode.component'
import { SelectionModule } from './selection/selection.module';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEng, 'eng');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PlanComponent,
    PlanitemComponent,

    /*ProcselectionComponent,
    HeaderprocComponent,
    ContentprocComponent,
    SelecMenuComponent,*/

    DossierComponent,
    ModeComponent,
    BudgetComponent,
    UsergroupComponent,
    UserComponent,
    PaiementComponent,
    //AvisComponent,
    PlanprintComponent,
    //CaminvComponent,
   // ScaminvComponent,
    //OffreComponent,
    //CamrapportComponent,
    //ScamrapportComponent,
    ///ResultatComponent,
   //// MarcheComponent,
    OrdreComponent,
   // CourrierComponent,
   // CautionComponent,
    LocalisationComponent,
    TypeComponent,
    PlanimportComponent,
    DossierppmComponent,
    VenteComponent,
    CaisseComponent,
    FournisseurComponent,
    ModepaiementComponent,
    TypcreditComponent,
    ImmobilisationComponent,
    CreditComponent,
    AgentComponent,
    DossiertechComponent,
    PlanitemexeComponent,
    //OuvertureComponent,
   // AnalyseComponent,
    //PvouvertureComponent,
   // DeliberationComponent,
   // ProceverbComponent,
    SiteComponent,
    DospieceComponent,
    TypreceptionComponent,
    ReceptionComponent,
    OrdresuspensionComponent,
    OrdrerepriseComponent,
    AvenantComponent,
    TraitementdossierComponent,
    SuivitdossierComponent,
    //PubavisComponent,
   // PubresultatsComponent,
    LotComponent,
    TauxglobalComponent,
    TauxdetailsComponent,
    TauxagentComponent,
    DossierinfructueuxComponent,
    LotinfructueuxComponent,
    EtatventeComponent,
    VenteDossierComponent,
    VenteDossierProcedureComponent,
    PaiementDossierComponent,
    PaiementDossierProcedureComponent,
    DossierAgentComponent,
    MarcheExecutionComponent,
    DeviseComponent,
    FonctionaliteComponent,
    PrivilegeComponent,
    SuiviFactureComponent,
    SuiviMarcheComponent,
    ExecutionMarcheComponent,
    VenteAddComponent,
    DossierModeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    NgbModule,
    MatRippleModule,
    MatSidenavModule,
    MatListModule,
    NgxPrintModule,
    MatPaginatorModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatTableModule,
    FormsModule,
    NgxCsvParserModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    QuillModule.forRoot(), //<-- Updated Quill Module
    MatExpansionModule,
    ProgressBarModule,
    

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
