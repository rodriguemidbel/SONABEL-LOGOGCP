const db = require('../db/db');

class PaiementDAO {
  async createPaiement(marche_id,num_facture,date_facture, montant_cfa,montant_devise,devise,taux_exe_phy,taux_exe_fin,observation,fichier) {
    const [id] = await db('paiements')
      .insert({
        marche_id,
        num_facture,
        date_facture,
        montant_cfa,
        montant_devise,
        devise,
        taux_exe_phy,
        taux_exe_fin,
        observation,
        fichier
      })
      .returning('id');

    return id;
  };

  async getAllPaiement() {
    return await db('paiements')
    .join('marches', 'marches.id', 'paiements.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.montant_total as montant_total',
        'paiements.id as id',
        'paiements.num_facture as num_facture',
        'paiements.date_facture as date_facture',
        'paiements.montant_cfa as montant_cfa',
        'paiements.devise as devise',
        'paiements.montant_devise as montant_devise',
        'paiements.taux_exe_phy as taux_exe_phy',
        'paiements.taux_exe_fin as taux_exe_fin',
        'paiements.observation as observation',
      )
  };

  /*async getAllDossier() {
    return await db('paiements');
  };*/

  async getOnePaiement(id) {
    return await db('paiements').where({id}).first();
  };

  async removePaiement(id) {
    return await db('paiements').where({id}).del();
  };

  async updatePaiement(id,changes) {
    return await db('paiements').where({id}).update(changes)
    .then(() =>{
      return db('paiements').where({id}).first();
    });
  };

  async findPaiement(marche_id) {
    return await db('marches')
    .join('marches', 'marches.id', 'ordrereprises.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.montant as marche_mnt',
        'paiements.id as id',
        'paiements.num_facture as num_facture',
        'paiements.date_facture as date_facture',
        'paiements.montant as montant',
        'paiements.taux_exe_phy as taux_exe_phy',
        'paiements.taux_exe_fin as taux_exe_fin',
        'paiements.observation as observation',
        'paiements.fichier as fichier',
      )
      .where({marche_id})
  };


 
}

module.exports = new PaiementDAO();