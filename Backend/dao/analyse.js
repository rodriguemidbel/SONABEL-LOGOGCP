const db = require('../db/db');

class AnalyseDAO {
  async createAnalyse(dossier_id,date_convocation,date_effec_ana,date_trans_dgcmef,observation,rapport) {
    const [id] = await db('analyses')
      .insert({
        dossier_id,
        date_convocation,
        date_effec_ana,
        date_trans_dgcmef,
        observation,
        rapport
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('analyses');
  };*/
  async getAllAnalyse(dossier_id) {
    return await db('analyses')
      .join('dossiers', 'dossiers.id', 'analyses.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'analyses.id as id',
        'analyses.date_convocation as date_convocation',
        'analyses.date_effec_ana as date_effec_ana',
        'analyses.date_trans_dgcmef as date_trans_dgcmef',
        'analyses.observation as observation',
        'analyses.rapport as rapport'
        
      )
      .where({dossier_id})
  };

  async getOneAnalyse(id) {
    return await db('analyses').where({id}).first();
  };

  async removeAnalyse(id) {
    return await db('analyses').where({id}).del();
  };

  async updateAnalyse(id,changes) {
    return await db('analyses').where({id}).update(changes)
    .then(() =>{
      return db('analyses').where({id}).first();
    });
  };

  async findAnalyse(dossier_id) {
    return await db('analyses')
    .join('dossiers', 'dossiers.id', 'analyses.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'analyses.id as id',
        'analyses.date_convocation as date_convocation',
        'analyses.date_effec_ana as date_effec_ana',
        'analyses.date_trans_dgcmef as date_trans_dgcmef',
        'analyses.observation as observation',
        'analyses.rapport as rapport'
      )
      .where({dossier_id})
  };

 
}

module.exports = new AnalyseDAO();