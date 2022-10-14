const db = require('../db/db');

class MarcheDAO {
  async createMarche(mar_doss_id,lot_id,num_ref,objet,date_appro,date_notif,montant,devise,
    montant2,devise2,montant3,devise3,montant4,devise4,montant_total,devise_total,delai,
    attributaire,date_rem_sign,date_retour_sign,date_rem_enr,date_retour_enr,marche) {
    const [id] = await db('marches')
      .insert({
        mar_doss_id,
        lot_id,
        num_ref,
        objet,
        date_appro,
        date_notif,
        montant,
        devise,
        montant2,
        devise2,
        montant3,
        devise3,
        montant4,
        devise4,
        montant_total,
        devise_total,
        delai,
        attributaire,
        date_rem_sign,
        date_retour_sign,
        date_rem_enr,
        date_retour_enr,
        marche
      })
      .returning('id');

    return id;
  };

 async getAllMarche() {
    return await db('marches');
  };
 /*async getAllMarche(mar_doss_id) {
    return await db('marches')
      .join('dossiers', 'dossiers.id', 'marches.mar_doss_id')
      .join('fournisseurs','fournisseurs.id','marches.attributaire')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'marches.id as id',
        'marches.num_ref as num_ref',
        'marches.objet as objet',
        'marches.date_appro as date_appro',
        'marches.date_notif as date_notif',
        'marches.montant as montant',
        'marches.delai as delai',
        'marches.attributaire as attributaire',
        'marches.date_rem_sign as date_rem_sign',
        'marches.date_retour_sign as date_retour_sign',
        'marches.date_rem_enr as date_rem_enr',
        'marches.date_retour_enr as date_retour_enr',
        'marches.marche as marche'
      )
      .where({mar_doss_id})
  };*/

  async getOneMarche(id) {
    return await db('marches').where({id}).first();
  };

  async removeMarche(id) {
    return await db('marches').where({id}).del();
  };

  async updateMarche(id,changes) {
    return await db('marches').where({id}).update(changes)
    .then(() =>{
      return db('marches').where({id}).first();
    });
  };

  async findMarche(mar_doss_id) {
    return await db('marches')
    .join('dossiers', 'dossiers.id', 'marches.mar_doss_id')
      .join('fournisseurs','fournisseurs.id','marches.attributaire')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'dossiers.date_trans_dgcmef as date_trans_dgcmef',
        'dossiers.taux_avencement as taux_avencement',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'marches.id as id',
        'marches.num_ref as num_ref',
        'marches.objet as objet',
        'marches.date_appro as date_appro',
        'marches.date_notif as date_notif',
        'marches.montant_total as montant_total',
        'marches.devise_total as devise_total',
        'marches.delai as delai',
        'marches.attributaire as attributaire',
        'marches.date_rem_sign as date_rem_sign',
        'marches.date_retour_sign as date_retour_sign',
        'marches.date_rem_enr as date_rem_enr',
        'marches.date_retour_enr as date_retour_enr',
        'marches.marche as marche'
      )
      .where({mar_doss_id})
  };

  async getMarche() {
    return await db('marches')
    .join('lots','lots.id','marches.lot_id')
    .join('dossiers','dossiers.id', 'marches.dossier_id')
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
      'planitems.agent as agent',
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
      'dossiers.dossier as dossier',
      'lots.num_lot as num_lot',
      'lots.intitule_lot as intitule_lot',
      'lots.montant_lot as montant_lot',
      'marches.date_notif as date_notif'
      
    )
  };

  async nbrPassMarche(annee) {
    return await db('marches')
    .join('dossiers','dossiers.id', 'marches.mar_doss_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .count('marches.id as nbr_marche')
    .whereNotNull('date_appro')
  };

 
}

module.exports = new MarcheDAO();