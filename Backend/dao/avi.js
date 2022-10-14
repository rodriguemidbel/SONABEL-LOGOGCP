const db = require('../db/db');

class AviDAO {
  async createAvi(dossier_id,date_envoi,date_publi,num_publi,fichier) {
    const [id] = await db('avis')
      .insert({
        dossier_id,
        date_envoi,
        date_publi,
        num_publi,
        fichier
      })
      .returning('id');

    return id;
  };

  /*async getAllDossier() {
    return await db('avis');
  };*/
  async getAllAvi(dossier_id) {
    return await db('avis')
      .join('dossiers', 'dossiers.id', 'avis.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .select(
        'planitems.mode as mode',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'avis.id as id',
        'avis.date_envoi as date_envoi',
        'avis.date_publi as date_publi',
        'avis.num_publi as num_publi',
        'avis.fichier as fichier'
      )
      .where({dossier_id})
  };

  async getOneAvi(id) {
    return await db('avis').where({id}).first();
  };

  async removeAvi(id) {
    return await db('avis').where({id}).del();
  };

  async updateAvi(id,changes) {
    return await db('avis').where({id}).update(changes)
    .then(() =>{
      return db('avis').where({id}).first();
    });
  };

  async findAvi(dossier_id) {
    return await db('avis')
      .join('dossiers', 'dossiers.id', 'avis.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .select(
        'planitems.mode as mode',
        'dossiers.id as dossierID',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'avis.id as id',
        'avis.date_envoi as date_envoi',
        'avis.date_publi as date_publi',
        'avis.num_parution as num_parution',
        'avis.fichier as fichier'
      )
      .where({dossier_id})
  };

 
}

module.exports = new AviDAO();