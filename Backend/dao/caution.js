const db = require('../db/db');

class CautionDAO {
  async createCaution(cau_doss_id,lot_id,soumissionaire,date_caution,banque,montant_caution,caution) {
    const [id] = await db('cautions')
      .insert({
        cau_doss_id,
        lot_id,
        soumissionaire,
        date_caution,
        banque,
        montant_caution,
        caution
      })
      .returning('id');

    return id;
  };

  async getAllCaution() {
    return await db('cautions')
      .join('dossiers', 'dossiers.id', 'cautions.cau_doss_id')
      .join('fournisseurs','fournisseurs.id','cautions.soumissionaire')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'cautions.id as id',
        'cautions.lot_id as lot_id',
        'cautions.soumissionaire as soumissionaire',
        'cautions.date_caution as date_caution',
        'cautions.banque as banque',
        'cautions.montant_caution as montant_caution',
        'cautions.caution as caution'
      )
      
  };

  async getOneCaution(id) {
    return await db('cautions').where({id}).first();
  };

  async removeCaution(id) {
    return await db('cautions').where({id}).del();
  };

  async updateCaution(id,changes) {
    return await db('cautions').where({id}).update(changes)
    .then(() =>{
      return db('cautions').where({id}).first();
    });
  };

  async findCaution(cau_doss_id){
    return await db('cautions')
    .join('dossiers', 'dossiers.id', 'cautions.cau_doss_id')
    .join('lots', 'lots.id', 'cautions.lot_id')
    .join('fournisseurs','fournisseurs.id','cautions.soumissionaire')
    .select(
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'lots.intitule_lot as intitule_lot',
      'fournisseurs.id as fourID',
      'fournisseurs.nom_four as nom_four',
      'cautions.id as id',
      'cautions.soumissionaire as soumissionaire',
      'cautions.date_caution as date_caution',
      'cautions.banque as banque',
      'cautions.montant_caution as montant_caution',
      'cautions.caution as caution'
      )
      .where({cau_doss_id})
  };

 
}

module.exports = new CautionDAO();