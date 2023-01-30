import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { AvenantComponent } from './avenant/avenant.component';
import { AvisComponent } from './avis/avis.component';
import { BudgetComponent } from './budget/budget.component';
import { CaisseComponent } from './caisse/caisse.component';
import { CaminvComponent } from './caminv/caminv.component';
import { CautionComponent } from './caution/caution.component';
import { CourrierComponent } from './courrier/courrier.component';
import { CreditComponent } from './credit/credit.component';
import { DeliberationComponent } from './deliberation/deliberation.component';
import { DeviseComponent } from './devise/devise.component';
import { DospieceComponent } from './dospiece/dospiece.component';
import { DossierComponent } from './dossier/dossier.component';
import { DossierppmComponent } from './dossierppm/dossierppm.component';
import { DossiertechComponent } from './dossiertech/dossiertech.component';
import { DossierAgentComponent } from './etats/dossier-agent/dossier-agent.component';
import { DossierModeComponent } from './etats/dossier-mode/dossier-mode.component';
import { DossierinfructueuxComponent } from './etats/dossierinfructueux/dossierinfructueux.component';
import { EtatventeComponent } from './etats/etatvente/etatvente.component';
import { ExecutionMarcheComponent } from './etats/execution-marche/execution-marche.component';
import { LotinfructueuxComponent } from './etats/lotinfructueux/lotinfructueux.component';
import { MarcheExecutionComponent } from './etats/marche-execution/marche-execution.component';
import { PaiementDossierProcedureComponent } from './etats/paiement-dossier-procedure/paiement-dossier-procedure.component';
import { PaiementDossierComponent } from './etats/paiement-dossier/paiement-dossier.component';
import { SuiviFactureComponent } from './etats/suivi-facture/suivi-facture.component';
import { SuiviMarcheComponent } from './etats/suivi-marche/suivi-marche.component';
import { SuivitdossierComponent } from './etats/suivitdossier/suivitdossier.component';
import { TauxagentComponent } from './etats/tauxagent/tauxagent.component';
import { TauxdetailsComponent } from './etats/tauxdetails/tauxdetails.component';
import { TauxglobalComponent } from './etats/tauxglobal/tauxglobal.component';
import { TraitementdossierComponent } from './etats/traitementdossier/traitementdossier.component';
import { VenteDossierProcedureComponent } from './etats/vente-dossier-procedure/vente-dossier-procedure.component';
import { VenteDossierComponent } from './etats/vente-dossier/vente-dossier.component';
import { FonctionaliteComponent } from './fonctionalite/fonctionalite.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
//import { DossierComponent } from './dossier/dossier.component';

import { HomeComponent } from './home/home.component';
import { ImmobilisationComponent } from './immobilisation/immobilisation.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { LoginComponent } from './login/login.component';
import { LotComponent } from './lot/lot.component';
import { MarcheComponent } from './marche/marche.component';
import { ModeComponent } from './mode/mode.component';
import { ModepaiementComponent } from './modepaiement/modepaiement.component';
import { OffreComponent } from './offre/offre.component';
import { OrdreComponent } from './ordre/ordre.component';
import { OrdrerepriseComponent } from './ordrereprise/ordrereprise.component';
import { OrdresuspensionComponent } from './ordresuspension/ordresuspension.component';
import { OuvertureComponent } from './ouverture/ouverture.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PlanComponent } from './plan/plan.component';
import { PlanimportComponent } from './planimport/planimport.component';
import { PlanitemComponent } from './planitem/planitem.component';
import { PlanitemexeComponent } from './planitemexe/planitemexe.component';
import { PlanprintComponent } from './planprint/planprint.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { ProceverbComponent } from './proceverb/proceverb.component';
import { ProcselectionComponent } from './procselection/procselection.component';
import { PubavisComponent } from './pubavis/pubavis.component';
import { PubresultatsComponent } from './pubresultats/pubresultats.component';
import { PvouvertureComponent } from './pvouverture/pvouverture.component';
import { ReceptionComponent } from './reception/reception.component';
import { ResultatComponent } from './resultat/resultat.component';
import { ScaminvComponent } from './scaminv/scaminv.component';
import { SiteComponent } from './site/site.component';
import { TypeComponent } from './type/type.component';
import { TypreceptionComponent } from './typreception/typreception.component';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { VenteAddComponent } from './vente-add/vente-add.component';
import { VenteComponent } from './vente/vente.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'usergroup', component: UsergroupComponent},
  {path: 'user', component: UserComponent},
  {path: 'mode', component: ModeComponent},
  {path: 'budget', component: BudgetComponent},
  {path: 'typecredit', component: TypeComponent},
  {path: 'immobilisation', component: ImmobilisationComponent},
  {path: 'credit', component: CreditComponent},
  {path: 'agent', component: AgentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'plan', component: PlanComponent},
  {path: 'planitem', component: PlanitemComponent},
  {path: 'planprint/:annee', component: PlanprintComponent},

  {path: 'dossier', component: DossierComponent},
  {path: 'lot/:dossierId', component: LotComponent},

  {path: 'dossierppm', component: DossierppmComponent},
  {path: 'procselection/:dossierid', component: AvisComponent},
  {path: 'vente', component: VenteComponent},
  {path: 'add-vente', component: VenteAddComponent},

  {path: 'avis/:dossierid', component: AvisComponent},
  {path: 'caminv/:dossierid', component: CaminvComponent},
  {path: 'scaminv/:dossierid', component: ScaminvComponent},
  {path: 'offre/:dossierid', component: OffreComponent},
  {path: 'camrapport/:dossierid', component: CaminvComponent},
  {path: 'scamrapport/:dossierid', component: ScaminvComponent},
  {path: 'resultat/:dossierid', component: ResultatComponent},
  {path: 'marche/:dossierid', component: MarcheComponent},
  {path: 'caution/:dossierid', component: CautionComponent},
  {path: 'ordreserv', component:OrdreComponent},
  {path: 'courrier/:dossierid', component: CourrierComponent},
  {path: 'type', component: TypeComponent},
  {path: 'localisation', component: LocalisationComponent},
  {path: 'importationppm', component: PlanimportComponent},
  {path: 'fournisseur', component: FournisseurComponent},
  {path: 'modepaie', component: ModepaiementComponent},
  {path: 'caisse', component: CaisseComponent},
  /********Execution********************* */
  {path: 'planitemexe', component: PlanitemexeComponent},
  {path: 'dossiertech', component: DossiertechComponent},
  {path: 'pvouverture/:dossierid', component: PvouvertureComponent},
  {path: 'deliberation/:dossierid', component: DeliberationComponent},
  {path: 'analyse/:dossierid', component: AnalyseComponent},
  {path: 'proceverb/:dossierid', component: ProceverbComponent},
  {path: 'pubavis/:dossierid', component: PubavisComponent},
  {path: 'pubresultat/:dossierid', component: PubresultatsComponent},
  {path: 'site', component: SiteComponent},
  {path: 'dospiece', component: DospieceComponent},
  {path: 'typreception', component: TypreceptionComponent},
  {path: 'reception', component: ReceptionComponent},

  {path: 'paiement', component: PaiementComponent},
  {path: 'suspension', component: OrdresuspensionComponent},
  {path: 'reprise', component: OrdrerepriseComponent },
  {path: 'avenant', component: AvenantComponent },

  {path: 'traitementdossier', component: TraitementdossierComponent },
  {path: 'suivitdossier', component: SuivitdossierComponent },

  {path: 'tauxglobal', component: TauxglobalComponent },
  {path: 'tauxdetail', component: TauxdetailsComponent },
  {path: 'tauxagent', component: TauxagentComponent },

  {path: 'dossierinfructueux', component: DossierinfructueuxComponent },
  {path: 'lotinfructueux', component: LotinfructueuxComponent },

  {path: 'etatvente', component: EtatventeComponent },

  {path: 'vente-dossier', component: VenteDossierComponent },
  {path: 'vente-dossier-procedure', component: VenteDossierProcedureComponent },
  {path: 'paiement-dossier', component: PaiementDossierComponent },
  {path: 'paiement-dossier-procedure', component: PaiementDossierProcedureComponent },

  {path: 'dossier-agent', component: DossierAgentComponent },
  {path: 'marche-exe', component: MarcheExecutionComponent },

  {path: 'devise', component: DeviseComponent },
  {path: 'fonctionnalite', component: FonctionaliteComponent },
  {path: 'privilege', component: PrivilegeComponent },

  {path: 'suivi-facture', component: SuiviFactureComponent },
  {path: 'suivi-marche', component: SuiviMarcheComponent },
  {path: 'exe-marche', component: ExecutionMarcheComponent },
  {path: 'dossier-mode', component: DossierModeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
