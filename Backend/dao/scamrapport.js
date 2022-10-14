const db = require('../db/db');

class ScamrapportDAO {
  async createScamrapport(dossier_id,date_scam_rap,rapport_scam) {
    const [id] = await db('scamrapports')
      .insert({
        dossier_id,
        date_scam_rap,
        rapport_scam
      })
      .returning('id');

    return id;
  };

  /*async getAllDossier() {
    return await db('dossiers');
  };*/
  async getAllScamrapport(dossier_id) {
    return await db('dossiers')
      .join('scamrapports', 'dossiers.id', 'scamrapports.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'scamrapports.id as id',
        'scamrapports.date_scam_rap as date_scam_rap',
        'scamrapports.rapport_scam as rapport_scam',
      )
      .where({dossier_id})
  };

  async getOneScamrapport(id) {
    return await db('scamrapports').where({id}).first();
  };

  async removeScamrapport(id) {
    return await db('scamrapports').where({id}).del();
  };

  async updateScamrapport(id,changes) {
    return await db('scamrapports').where({id}).update(changes)
    .then(() =>{
      return db('scamrapports').where({id}).first();
    });
  };

  async findScamrapport(dossier_id) {
    return await db('dossiers')
      .join('scamrapports', 'dossiers.id', 'scamrapports.dossier_id')
      .select(
        'dossiers.id as dossierID',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'scamrapports.id as id',
        'scamrapports.date_scam_rap as date_scam_rap',
        'scamrapports.rapport_scam as rapport_scam',
      )
      .where({dossier_id})
  };

 
}

module.exports = new ScamrapportDAO();