const db = require('../db/db');

class DeliberationDAO {
  async createDeliberation(dossier_id,date_convocation,date_transpv_sign,date_retourpv_sign,date_transpv_dgcmef,pvdeliberation) {
    const [id] = await db('deliberations')
      .insert({
        dossier_id,
        date_convocation,
        date_transpv_sign,
        date_retourpv_sign,
        date_transpv_dgcmef,
        pvdeliberation
      })
      .returning('id');

    return id;
  };

  async getAllDeliberation() {
    return await db('deliberations')
      .join('dossiers', 'dossiers.id', 'deliberations.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'deliberations.id as id',
        'deliberations.date_convocation as date_convocation',
        'deliberations.date_transpv_sign as date_transpv_sign',
        'deliberations.date_retourpv_sign as date_retourpv_sign',
        'deliberations.date_transpv_dgcmef as date_transpv_dgcmef',
        'deliberations.pvdeliberation as pv'
        
      )
      
  };

  async getOneDeliberation(id) {
    return await db('deliberations').where({id}).first();
  };

  async removeDeliberation(id) {
    return await db('deliberations').where({id}).del();
  };

  async updateDeliberation(id,changes) {
    return await db('deliberations').where({id}).update(changes)
    .then(() =>{
      return db('deliberations').where({id}).first();
    });
  };

  async findDeliberations(dossier_id) {
    return await db('deliberations')
    .join('dossiers', 'dossiers.id', 'deliberations.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'deliberations.id as id',
        'deliberations.date_convocation as date_convocation',
        'deliberations.date_transpv_sign as date_transpv_sign',
        'deliberations.date_retourpv_sign as date_retourpv_sign',
        'deliberations.date_transpv_dgcmef as date_transpv_dgcmef',
        'deliberations.pvdeliberation as pv'
        
      )
      .where({dossier_id})
  };

 
}

module.exports = new DeliberationDAO();