const db = require('../db/db');

class PubresultatDAO {
  async createPubresultat(dossier_id,num_bordereau,date_bordereau) {
    const [id] = await db('pubresultats')
      .insert({
        dossier_id,
        num_bordereau,
        date_bordereau
      })
      .returning('id');

    return id;
  };

  async getAllPubresultat() {
    return await db('pubresultats')
      .join('dossiers', 'dossiers.id', 'pubresultats.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'pubresultats.id as id',
        'pubresultats.num_bordereau as num_bordereau',
        'pubresultats.date_bordereau as date_bordereau',
      )
      
  };

  async getOnePubresultat(id) {
    return await db('pubresultats').where({id}).first();
  };

  async removePubresultat(id) {
    return await db('pubresultats').where({id}).del();
  };

  async updatePubresultat(id,changes) {
    return await db('pubresultats').where({id}).update(changes)
    .then(() =>{
      return db('pubresultats').where({id}).first();
    });
  };

  async findPubresultats(dossier_id) {
    return await db('pubresultats')
    .join('dossiers', 'dossiers.id', 'pubresultats.dossier_id')
    .select(
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'pubresultats.id as id',
      'pubresultats.num_bordereau as num_bordereau',
      'pubresultats.date_bordereau as date_bordereau',
    )
    .where({dossier_id})
  };

 
}

module.exports = new PubresultatDAO();