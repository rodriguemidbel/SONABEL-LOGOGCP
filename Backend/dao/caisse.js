const db = require('../db/db');

class CaisseDAO {
  async createCaisse(num_recu,date_recu,vente_id,modepaiement_id,ref_virement) {
    const [id] = await db('caisses')
      .insert({
        num_recu,
        date_recu,
        vente_id,
        modepaiement_id,
        ref_virement
      })
      .returning('id');

    return id;
  };

  
  async getAllCaisse() {
    return await db('caisses')
    .join('ventes', 'ventes.id', 'caisses.vente_id')
    .join('lots', 'lots.id', 'ventes.lot_id')
    .join('dossiers','dossiers.id','lots.dossier_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('modepaiements', 'modepaiements.id', 'caisses.modepaiement_id')
    .join('fournisseurs', 'fournisseurs.id', 'ventes.fournisseur_id')
    .select(
      'planitems.mode as mode',
      'lots.id as lotID',
      'lots.num_lot as num_lot',
      'lots.intitule_lot as intitule_lot',
      'lots.montant_lot as montant_lot',
      'lots.montant_vente as montant_vente',
      'fournisseurs.id as fourID',
      'fournisseurs.nom_four as nom_four',
      'fournisseurs.rccm as rccm',
      'fournisseurs.ifu as ifu',
      'fournisseurs.telephone1 as telephone1',
      'fournisseurs.telephone2 as telephone2',
      'fournisseurs.adresse as adresse',
      'modepaiements.id as modepaieID',
      'modepaiements.libelle as modepaie',
      'ventes.id as vente_id',
      'ventes.num_vente as num_vente',
      'ventes.date_vente as date_vente',
      'ventes.montant as montant',
      'ventes.statut as statut',
      'caisses.id as id',
      'caisses.num_recu as num_recu',
      'caisses.date_recu as date_recu',
      'caisses.ref_virement as ref_virement'

        
    )
  };

  async getOneCaisse(id) {
    return await db('caisses').where({id}).first();
  };

  async removeCaisse(id) {
    return await db('caisses').where({id}).del();
  };

  async updateCaisse(id,changes) {
    return await db('caisses').where({id}).update(changes)
    .then(() =>{
      return db('caisses').where({id}).first();
    });
  };

  async findCaisse(vente_id) {
    return await db('caisses')
    .join('ventes', 'ventes.id', 'caisses.vente_id')
    .join('lots', 'lots.id', 'ventes.lot_id')
    .join('modepaiements', 'modepaiements.id', 'caisses.modepaiement_id')
    .join('fournisseurs', 'fournisseurs.id', 'ventes.fournisseur_id')
    .select(
        'lots.id as lotID',
        'lots.num_lot as num_lot',
        'lots.intitule_lot as intitule_lot',
        'lots.montant_lot as montant_lot',
        'lots.montant_vente as montant_vente',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'fournisseurs.rccm as rccm',
        'fournisseurs.ifu as ifu',
        'fournisseurs.telephone1 as telephone1',
        'fournisseurs.telephone2 as telephone2',
        'fournisseurs.adresse as adresse',
        'modepaiements.id as modepaieID',
        'modepaiements.libelle as modepaie',
        'ventes.id as vente_id',
        'ventes.num_vente as num_vente',
        'ventes.date_vente as date_vente',
        'ventes.montant as montant',
        'ventes.statut as statut',
        'caisses.id as id',
        'caisses.num_recu as num_recu',
        'caisses.date_recu as date_recu',
        'caisses.ref_virement as ref_virement'
        
    )
    .where({vente_id})
  };


 
}

module.exports = new CaisseDAO();