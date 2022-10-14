const db = require('../db/db');

class DossierDAO {
  async createDossier(planitem_id,numero_doss,intitule_doss,date_trans_sign,date_retour_sign,
    date_trans_dgcmef,taux_reception,niveau_traitement,taux_avencement,dossier,statut) {
    const [id] = await db('dossiers')
      .insert({
        planitem_id,
        numero_doss,
        intitule_doss,
        date_trans_sign,
        date_retour_sign,
        date_trans_dgcmef,
        taux_reception,
        niveau_traitement,
        taux_avencement,
        dossier,
        statut
      })
      .returning('id');

    return id;
  };

  
  async getAllDossier() {
    return await db('dossiers')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .join('agents', 'agents.id', 'planitems.agent_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as planitem_id',
      'planitems.num_ordre as num_ordre',
      'planitems.budget as budget',
      'planitems.typcredit as typcredit',
      'planitems.immobilisation as immobilisation',
      'planitems.credit as credit',
      'planitems.centre_cout as centre_cout',
      'planitems.projet as projet',
      'planitems.localisation as localisation',
      'planitems.responsable as responsable',
      'planitems.montant_estime as montant_estime',
      'planitems.composante as composante',
      'planitems.montant_dispo as montant_dispo',
      'planitems.designation as designation',
      'planitems.mode as mode',
      'planitems.nbr_lot as nbr_lot',
      'planitems.agent_id as agent_id',
      'planitems.date_tech as date_tech',
      'planitems.date_dgcmef as date_dgcmef',
      'planitems.date_dgcmef_reel as date_dgcmef_reel',
      'planitems.date_off as date_off',
      'planitems.date_off_reel as date_off_reel',
      'planitems.temp as temp',
      'planitems.temp_reel as temp_reel',
      'planitems.date_resultat as date_resultat',
      'planitems.resultat as resultat',
      'planitems.date_visite_site as date_visite_site',
      'planitems.date_demarrage as date_demarrage',
      'planitems.date_reel_demarrage as date_reel_demarrage',
      'planitems.delai_exe as delai_exe',
      'planitems.delai_reel_exe as delai_reel_exe',
      'planitems.date_butoir as date_butoir',
      'planitems.date_reel_fin as date_reel_fin',
      'planitems.date_visite_site as date_visite_site',
      'planitems.budget_travaux as budget_travaux',
      'planitems.observation as observation',  
      'agents.nom_prenom as agent',    
      'dossiers.id as id',
      'dossiers.numero_doss as numero_doss',
      'dossiers.intitule_doss as intitule_doss',
      'dossiers.date_trans_sign as date_trans_sign',
      'dossiers.date_retour_sign as date_retour_sign',
      'dossiers.date_trans_dgcmef as date_trans_dgcmef',
      'dossiers.taux_avencement as taux_avencement',
      'dossiers.dossier as dossier',
      'dossiers.statut as statut_doss'
    )
    .orderBy('dossiers.id', 'asc')
  };

  async getOneDossier(id) {
    return await db('dossiers').where({id}).first();
  };

  async removeDossier(id) {
    return await db('dossiers').where({id}).del();
  };

  async updateDossier(id,changes) {
    return await db('dossiers').where({id}).update(changes)
    .then(() =>{
      return db('dossiers').where({id}).first();
    });
  };

  async findDossier(annee) {
    return await db('dossiers')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .join('agents', 'agents.id', 'planitems.agent_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as planitem_id',
      'planitems.num_ordre as num_ordre',
      'planitems.budget as budget',
      'planitems.typcredit as typcredit',
      'planitems.immobilisation as immobilisation',
      'planitems.credit as credit',
      'planitems.centre_cout as centre_cout',
      'planitems.projet as projet',
      'planitems.localisation as localisation',
      'planitems.responsable as responsable',
      'planitems.montant_estime as montant_estime',
      'planitems.composante as composante',
      'planitems.montant_dispo as montant_dispo',
      'planitems.designation as designation',
      'planitems.mode as mode',
      'planitems.nbr_lot as nbr_lot',
      'planitems.agent_id as agent_id',
      'planitems.date_tech as date_tech',
      'planitems.date_dgcmef as date_dgcmef',
      'planitems.date_dgcmef_reel as date_dgcmef_reel',
      'planitems.date_off as date_off',
      'planitems.date_off_reel as date_off_reel',
      'planitems.temp as temp',
      'planitems.temp_reel as temp_reel',
      'planitems.date_resultat as date_resultat',
      'planitems.resultat as resultat',
      'planitems.date_visite_site as date_visite_site',
      'planitems.date_demarrage as date_demarrage',
      'planitems.date_reel_demarrage as date_reel_demarrage',
      'planitems.delai_exe as delai_exe',
      'planitems.delai_reel_exe as delai_reel_exe',
      'planitems.date_butoir as date_butoir',
      'planitems.date_reel_fin as date_reel_fin',
      'planitems.date_visite_site as date_visite_site',
      'planitems.budget_travaux as budget_travaux',
      'planitems.observation as observation', 
      'agents.nom_prenom as agent',      
      'dossiers.id as id',
      'dossiers.numero_doss as numero_doss',
      'dossiers.intitule_doss as intitule_doss',
      'dossiers.date_trans_sign as date_trans_sign',
      'dossiers.date_retour_sign as date_retour_sign',
      'dossiers.date_trans_dgcmef as date_trans_dgcmef',
      'dossiers.taux_avencement as taux_avencement',
      'dossiers.dossier as dossier',
      'dossiers.statut as statut_doss'
    )
    .where({annee})
    .orderBy('dossiers.id', 'asc')
  };

  async findDossierByAgent(agent_id,annee) {
    return await db('dossiers')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as planitem_id',
      'planitems.num_ordre as num_ordre',
      'planitems.budget as budget',
      'planitems.typcredit as typcredit',
      'planitems.immobilisation as immobilisation',
      'planitems.credit as credit',
      'planitems.centre_cout as centre_cout',
      'planitems.projet as projet',
      'planitems.localisation as localisation',
      'planitems.responsable as responsable',
      'planitems.montant_estime as montant_estime',
      'planitems.composante as composante',
      'planitems.montant_dispo as montant_dispo',
      'planitems.designation as designation',
      'planitems.mode as mode',
      'planitems.nbr_lot as nbr_lot',
      'planitems.agent_id as agent_id',
      'planitems.date_tech as date_tech',
      'planitems.date_dgcmef as date_dgcmef',
      'planitems.date_dgcmef_reel as date_dgcmef_reel',
      'planitems.date_off as date_off',
      'planitems.date_off_reel as date_off_reel',
      'planitems.temp as temp',
      'planitems.temp_reel as temp_reel',
      'planitems.date_resultat as date_resultat',
      'planitems.resultat as resultat',
      'planitems.date_visite_site as date_visite_site',
      'planitems.date_demarrage as date_demarrage',
      'planitems.date_reel_demarrage as date_reel_demarrage',
      'planitems.delai_exe as delai_exe',
      'planitems.delai_reel_exe as delai_reel_exe',
      'planitems.date_butoir as date_butoir',
      'planitems.date_reel_fin as date_reel_fin',
      'planitems.date_visite_site as date_visite_site',
      'planitems.budget_travaux as budget_travaux',
      'planitems.observation as observation',    
      'dossiers.id as id',
      'dossiers.numero_doss as numero_doss',
      'dossiers.intitule_doss as intitule_doss',
      'dossiers.date_trans_sign as date_trans_sign',
      'dossiers.date_retour_sign as date_retour_sign',
      'dossiers.date_trans_dgcmef as date_trans_dgcmef',
      'dossiers.taux_avencement as taux_avencement',
      'dossiers.dossier as dossier',
      'dossiers.statut as statut_doss'
    )
    .where({agent_id,annee})
    .orderBy('dossiers.id', 'asc')
  };


  async getDossier() {
    return await db('dossiers')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as planitem_id',
      'planitems.num_ordre as num_ordre',
      'planitems.budget as budget',
      'planitems.typcredit as typcredit',
      'planitems.immobilisation as immobilisation',
      'planitems.credit as credit',
      'planitems.centre_cout as centre_cout',
      'planitems.projet as projet',
      'planitems.localisation as localisation',
      'planitems.responsable as responsable',
      'planitems.montant_estime as montant_estime',
      'planitems.composante as composante',
      'planitems.montant_dispo as montant_dispo',
      'planitems.designation as designation',
      'planitems.mode as mode',
      'planitems.nbr_lot as nbr_lot',
      'planitems.agent_id as agent_id',
      'planitems.date_tech as date_tech',
      'planitems.date_dgcmef as date_dgcmef',
      'planitems.date_dgcmef_reel as date_dgcmef_reel',
      'planitems.date_off as date_off',
      'planitems.date_off_reel as date_off_reel',
      'planitems.temp as temp',
      'planitems.temp_reel as temp_reel',
      'planitems.date_resultat as date_resultat',
      'planitems.resultat as resultat',
      'planitems.date_visite_site as date_visite_site',
      'planitems.date_demarrage as date_demarrage',
      'planitems.date_reel_demarrage as date_reel_demarrage',
      'planitems.delai_exe as delai_exe',
      'planitems.delai_reel_exe as delai_reel_exe',
      'planitems.date_butoir as date_butoir',
      'planitems.date_reel_fin as date_reel_fin',
      'planitems.date_visite_site as date_visite_site',
      'planitems.budget_travaux as budget_travaux',
      'planitems.observation as observation',    
      'dossiers.id as id',
      'dossiers.numero_doss as numero_doss',
      'dossiers.intitule_doss as intitule_doss',
      'dossiers.date_trans_sign as date_trans_sign',
      'dossiers.date_retour_sign as date_retour_sign',
      'dossiers.date_trans_dgcmef as date_trans_dgcmef',
      'dossiers.taux_avencement as taux_avencement',
      'dossiers.taux_avencement as days',
      'dossiers.dossier as dossier'
      
    )
  };


 
}

module.exports = new DossierDAO();