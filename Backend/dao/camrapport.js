const db = require('../db/db');

class CamrapportDAO {
  async createCamrapport(dossier_id,date_cam_rap,rapport_cam) {
    const [id] = await db('camrapports')
      .insert({
        dossier_id,
        date_cam_rap,
        rapport_cam
      })
      .returning('id');

    return id;
  };

  /*async getAllDossier() {
    return await db('dossiers');
  };*/
  async getAllCamrapport(dossier_id) {
    return await db('dossiers')
      .join('camrapports', 'dossiers.id', 'camrapports.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'camrapports.id as id',
        'camrapports.date_cam_rap as date_cam_rap',
        'camrapports.rapport_cam as rapport_cam',
       
      )
      .where({dossier_id})
  };

  async getOneCamrapport(id) {
    return await db('camrapports').where({id}).first();
  };

  async removeCamrapport(id) {
    return await db('camrapports').where({id}).del();
  };

  async updateCamrapport(id,changes) {
    return await db('camrapports').where({id}).update(changes)
    .then(() =>{
      return db('camrapports').where({id}).first();
    });
  };

  async findCamrapport(dossier_id) {
    return await db('dossiers')
      .join('camrapports', 'dossiers.id', 'camrapports.dossier_id')
      .select(
        'dossiers.id as dossierID',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'camrapports.id as id',
        'camrapports.date_cam_rap as date_cam_rap',
        'camrapports.rapport_cam as rapport_cam',
      )
      .where({dossier_id})
  };

 
}

module.exports = new CamrapportDAO();