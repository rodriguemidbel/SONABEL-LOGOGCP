const db = require('../db/db');


class ReceptionDAO {
  async createReception(marche_id,typreception_id,date_recept,heure_recept,membre,autre,pv_recept) {
    const [id] = await db('receptions')
      .insert({
        marche_id,
        typreception_id,
        date_recept,
        heure_recept,
        membre,
        autre,
        pv_recept
      })
      .returning('id');

    return id;
  };

  async getAllReception() {
    return await db('receptions')
    .join('typreceptions', 'typreceptions.id', 'receptions.typreception_id')
    .join('marches', 'marches.id', 'receptions.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'typreceptions.libelle as typreception',
      'receptions.id as id',
      'receptions.date_recept as date_recept',
      'receptions.heure_recept as heure_recept',
      'receptions.membre as membre',
      'receptions.autre as autre',
      'receptions.pv_recept as pv_recept'
      )
      .orderBy('receptions.id', 'asc');
  };

  async getOneReception(id) {
    return await db('receptions').where({id}).first();
  };

  async removeReception(id) {
    return await db('receptions').where({id}).del();
  };

  async updateReception(id,changes) {
    return await db('receptions').where({id}).update(changes)
    .then(() =>{
      return db('receptions').where({id}).first();
    });
  };

 
 
}

module.exports = new ReceptionDAO();