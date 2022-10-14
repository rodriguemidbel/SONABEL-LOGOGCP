const db = require('../db/db');

class CaminvDAO {
  async createCaminv(dossier_id,date_cam,heure_cam,lieu_cam,membre_cam,president_cam,distinc_presi_cam,ampliation) {
    const [id] = await db('caminvs')
      .insert({
        dossier_id,
        date_cam,
        heure_cam,
        lieu_cam,
        membre_cam,
        president_cam,
        distinc_presi_cam,
        ampliation
      })
      .returning('id');

    return id;
  };

  /*async getAllDossier() {
    return await db('caminvs');
  };*/
  async getAllCaminv(dossier_id) {
    return await db('caminvs')
      .join('dossiers', 'dossiers.id', 'caminvs.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .select(
        'planitems.mode as mode',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'caminvs.id as id',
        'caminvs.date_cam as date_cam',
        'caminvs.heure_cam as heure_cam',
        'caminvs.lieu_cam as lieu_cam',
        'caminvs.membre_cam as membre_cam',
        'caminvs.president_cam as president_cam',
        'caminvs.distinc_presi_cam as distinc_presi_cam',
        'caminvs.ampliation as ampliation',
      )
      .where({dossier_id})
  };

  async getOneCaminv(id) {
    return await db('caminvs').where({id}).first();
  };

  async removeCaminv(id) {
    return await db('caminvs').where({id}).del();
  };

  async updateCaminv(id,changes) {
    return await db('caminvs').where({id}).update(changes)
    .then(() =>{
      return db('caminvs').where({id}).first();
    });
  };

  async findCaminv(dossier_id) {
    return await db('caminvs')
      .join('dossiers', 'dossiers.id', 'caminvs.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .select(
        'planitems.mode as mode',
        'dossiers.id as dossierID',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'caminvs.id as id',
        'caminvs.date_cam as date_cam',
        'caminvs.heure_cam as heure_cam',
        'caminvs.lieu_cam as lieu_cam',
        'caminvs.membre_cam as membre_cam',
        'caminvs.president_cam as president_cam',
        'caminvs.distinc_presi_cam as distinc_presi_cam',
        'caminvs.ampliation as ampliation',
      )
      .where({dossier_id})
  };

 
}

module.exports = new CaminvDAO();