const db = require('../db/db');

class VenteDAO {
  async createVente(num_vente,lot_id,fournisseur_id,date_vente,heure_vente,montant,acheteur,contact_acheteur,statut,grpent) {
    const [id] = await db('ventes')
      .insert({
        num_vente,
        lot_id,
        fournisseur_id,
        date_vente,
        heure_vente,
        montant,
        acheteur,
        contact_acheteur,
        statut,
        grpent

      })
      .returning('id');

    return id;
  };

  
  async getAllVente() {
    return await db('ventes')
    .join('lots','lots.id','ventes.lot_id')
    .join('dossiers','dossiers.id','lots.dossier_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('fournisseurs','fournisseurs.id','ventes.fournisseur_id')
    .select(
        'planitems.mode as mode',
        'dossiers.id as dossier_id',
        'dossiers.numero_doss as numero_doss',
        'dossiers.intitule_doss as intitule_doss',
        'lots.id as lotID',
        'lots.num_lot as num_lot',
        'lots.intitule_lot as intitule_lot',
        'lots.montant_vente as montant_vente',
        'lots.montant_lot as montant_lot',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'ventes.id as id',
        'ventes.num_vente as num_vente',
        'ventes.date_vente as date_vente',
        'ventes.heure_vente as heure_vente',
        'ventes.montant as montant',
        'ventes.acheteur as acheteur',
        'ventes.contact_acheteur as contact_acheteur',
        'ventes.statut as statut',
        'ventes.grpent as grpent'
        
    )
    .orderBy('ventes.statut', 'asc')
  };

  async getOneVente(id) {
    return await db('ventes').where({id}).first();
  };

  async removeVente(id) {
    return await db('ventes').where({id}).del();
  };

  async updateVente(id,changes) {
    return await db('ventes').where({id}).update(changes)
    .then(() =>{
      return db('ventes').where({id}).first();
    });
  };

  async findVente(dossier_id) {
    return await db('ventes')
    .join('lots','lots.id','ventes.lot_id')
    .join('dossiers','dossiers.id','lots.dossier_id')
    .join('fournisseurs','fournisseurs.id','ventes.fournisseur_id')
    .select(
        'dossiers.id as dossier_id',
        'dossiers.numero_doss as numero_doss',
        'dossiers.intitule_doss as intitule_doss',
        'lots.id as lotID',
        'lots.num_lot as num_lot',
        'lots.intitule_lot as intitule_lot',
        'lots.montant_vente as montant_vente',
        'lots.montant_lot as montant_lot',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'ventes.id as id',
        'ventes.num_vente as num_vente',
        'ventes.date_vente as date_vente',
        'ventes.heure_vente as heure_vente',
        'ventes.montant as montant',
        'ventes.acheteur as acheteur',
        'ventes.contact_acheteur as contact_acheteur',
        'ventes.statut as statut',
        'ventes.grpent as grpent'
    )
    .where({dossier_id})
  };

  async findFrsVente(lot_id) {
    return await db('ventes')
    .join('lots','lots.id','ventes.lot_id')
    .join('fournisseurs','fournisseurs.id','ventes.fournisseur_id')
    .select(
        'lots.id as lotID',
        'lots.num_lot as num_lot',
        'lots.intitule_lot as intitule_lot',
        'lots.montant_vente as montant_vente',
        'lots.montant_lot as montant_lot',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'ventes.id as id',
        'ventes.num_vente as num_vente',
        'ventes.date_vente as date_vente',
        'ventes.heure_vente as heure_vente',
        'ventes.montant as montant',
        'ventes.acheteur as acheteur',
        'ventes.contact_acheteur as contact_acheteur',
        'ventes.statut as statut',
        'ventes.grpent as grpent'
    )
    .where({lot_id})
  };

  async findVenteID(lot_id,fournisseur_id) {
    return await db('ventes')
    .join('lots','lots.id','ventes.lot_id')
    .join('fournisseurs','fournisseurs.id','ventes.fournisseur_id')
    .select(
        'lots.id as lotID',
        'lots.num_lot as num_lot',
        'lots.intitule_lot as intitule_lot',
        'lots.montant_vente as montant_vente',
        'lots.montant_lot as montant_lot',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'ventes.id as vente_id',
        'ventes.num_vente as num_vente',
        'ventes.date_vente as date_vente',
        'ventes.heure_vente as heure_vente',
        'ventes.montant as montant',
        'ventes.acheteur as acheteur',
        'ventes.contact_acheteur as contact_acheteur',
        'ventes.statut as statut',
        'ventes.grpent as grpent'
    )
    .where({lot_id,fournisseur_id})
  };

  async countVentes(annee) {
    return await db('ventes')
    .join('lots', 'lots.id', 'ventes.lot_id')
    .join('dossiers', 'dossiers.id', 'lots.dossier_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .count('ventes.id as nbr')
    .where({annee})
  };

 

 
}

module.exports = new VenteDAO();