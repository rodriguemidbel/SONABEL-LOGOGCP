const db = require('../db/db');


class ImmobilisationDAO {
  async createImmobilisation(libelle) {
    const [id] = await db('immobilisations')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };

  async getAllImmobilisation() {
    return await db('immobilisations');
  };

  async getOneImmobilisation(id) {
    return await db('immobilisations').where({id}).first();
  };

  async removeImmobilisation(id) {
    return await db('immobilisations').where({id}).del();
  };

  async updateImmobilisation(id,changes) {
    return await db('immobilisations').where({id}).update(changes)
    .then(() =>{
      return db('immobilisations').where({id}).first();
    });
  };

 
}

module.exports = new ImmobilisationDAO();