const db = require('../db/db');

class ScaminvDAO {
  async createScaminv(dossier_id,date_scam,heure_scam,lieu_scam,membre_scam,president_sct,distinc_presi_sct,ampliation) {
    const [id] = await db('scaminvs')
      .insert({
        dossier_id,
        date_scam,
        heure_scam,
        lieu_scam,
        membre_scam,
        president_sct,
        distinc_presi_sct,
        ampliation
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('dossiers');
  };*/
  async getAllScaminv(dossier_id) {
    return await db('scaminvs')
      .join('dossiers', 'dossiers.id', 'scaminvs.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .select(
        'planitems.mode as mode',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'scaminvs.id as id',
        'scaminvs.date_scam as date_scam',
        'scaminvs.heure_scam as heure_scam',
        'scaminvs.lieu_scam as lieu_scam',
        'scaminvs.membre_scam as membre_scam',
        'scaminvs.ampliation as ampliation',
      )
      .where({dossier_id})
  };

  async getOneScaminv(id) {
    return await db('scaminvs').where({id}).first();
  };

  async removeScaminv(id) {
    return await db('scaminvs').where({id}).del();
  };

  async updateScaminv(id,changes) {
    return await db('scaminvs').where({id}).update(changes)
    .then(() =>{
      return db('scaminvs').where({id}).first();
    });
  };

  async findScaminv(dossier_id) {
    return await db('scaminvs')
    .join('dossiers', 'dossiers.id', 'scaminvs.dossier_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .select(
      'planitems.mode as mode',
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'scaminvs.id as id',
      'scaminvs.date_scam as date_scam',
      'scaminvs.heure_scam as heure_scam',
      'scaminvs.lieu_scam as lieu_scam',
      'scaminvs.membre_scam as membre_scam',
      'scaminvs.ampliation as ampliation',
    )
      .where({dossier_id})
  };

 
}

module.exports = new ScaminvDAO();