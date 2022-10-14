const db = require('../db/db');

class ProceverbDAO {
  async createProceverb(dossier_id,date_convocation,date_transpv_sign,date_retourpv_sign,date_transpv_dgcmef,pv) {
    const [id] = await db('proceverbs')
      .insert({
        dossier_id,
        date_convocation,
        date_transpv_sign,
        date_retourpv_sign,
        date_transpv_dgcmef,
        pv
      })
      .returning('id');

    return id;
  };

  async getAllProceverb() {
    return await db('proceverbs')
      .join('dossiers', 'dossiers.id', 'proceverbs.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'proceverbs.id as id',
        'proceverbs.date_convocation as date_convocation',
        'proceverbs.date_transpv_sign as date_transpv_sign',
        'proceverbs.date_retourpv_sign as date_retourpv_sign',
        'proceverbs.date_transpv_dgcmef as date_transpv_dgcmef',
        'proceverbs.pv as pv'
        
      )
      
  };

  async getOneProceverb(id) {
    return await db('proceverbs').where({id}).first();
  };

  async removeProceverb(id) {
    return await db('proceverbs').where({id}).del();
  };

  async updateProceverb(id,changes) {
    return await db('proceverbs').where({id}).update(changes)
    .then(() =>{
      return db('proceverbs').where({id}).first();
    });
  };

  async findProceverb(dossier_id) {
    return await db('proceverbs')
    .join('dossiers', 'dossiers.id', 'proceverbs.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'proceverbs.id as id',
        'proceverbs.date_convocation as date_convocation',
        'proceverbs.date_transpv_sign as date_transpv_sign',
        'proceverbs.date_retourpv_sign as date_retourpv_sign',
        'proceverbs.date_transpv_dgcmef as date_transpv_dgcmef',
        'proceverbs.pv as pv'
        
      )
      .where({dossier_id})
  };

 
}

module.exports = new ProceverbDAO();