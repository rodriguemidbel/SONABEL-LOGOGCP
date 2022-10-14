const db = require('../db/db');

class PubavisDAO {
  async createPubavis(dossier_id,date_bordereau,fichier,observation) {
    const [id] = await db('pubavis')
      .insert({
        dossier_id,
        date_bordereau,
        fichier,
        observation
      })
      .returning('id');

    return id;
  };

  async getAllPubavis() {
    return await db('pubavis')
      .join('dossiers', 'dossiers.id', 'pubavis.dossier_id')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'pubavis.id as id',
        'pubavis.date_bordereau as date_bordereau',
        'pubavis.observation as observation',
      )
      
  };

  async getOnePubavis(id) {
    return await db('pubavis').where({id}).first();
  };

  async removePubavis(id) {
    return await db('pubavis').where({id}).del();
  };

  async updatePubavis(id,changes) {
    return await db('pubavis').where({id}).update(changes)
    .then(() =>{
      return db('pubavis').where({id}).first();
    });
  };

  async findPubavis(dossier_id) {
    return await db('pubavis')
    .join('dossiers', 'dossiers.id', 'pubavis.dossier_id')
    .select(
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'pubavis.id as id',
      'pubavis.date_bordereau as date_bordereau',
      'pubavis.observation as observation',
      'pubavis.fichier as fichier'
    )
      .where({dossier_id})
  };

 
}

module.exports = new PubavisDAO();