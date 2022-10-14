const db = require('../db/db');

class CourrierDAO {
  async createCourrier(dossier_id,objet,date_courrier,fichier) {
    const [id] = await db('courriers')
      .insert({
        dossier_id,
        objet,
        date_courrier,
        fichier
      })
      .returning('id');

    return id;
  };

  /*async getAllDossier() {
    return await db('courriers');
  };*/
  async getAllCourrier(dossier_id) {
    return await db('courriers')
      .join('dossiers', 'dossiers.id', 'courriers.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'courriers.id as id',
        'courriers.objet as objet',
        'courriers.date_courrier as date_courrier',
        'courriers.fichier as fichier'
      )
      .where({dossier_id})
  };

  async getOneCourrier(id) {
    return await db('courriers').where({id}).first();
  };

  async removeCourrier(id) {
    return await db('courriers').where({id}).del();
  };

  async updateCourrier(id,changes) {
    return await db('courriers').where({id}).update(changes)
    .then(() =>{
      return db('courriers').where({id}).first();
    });
  };

  async findCourrier(dossier_id) {
    return await db('courriers')
    .join('dossiers', 'dossiers.id', 'courriers.dossier_id')
    .select(
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'courriers.id as id',
      'courriers.objet as objet',
      'courriers.date_courrier as date_courrier',
      'courriers.fichier as fichier'
    )
    .where({dossier_id})
  };

 
}

module.exports = new CourrierDAO();