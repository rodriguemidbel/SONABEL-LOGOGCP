const db = require('../db/db');

class LocalisationDAO {
  async createLocalisation(sigle,libelle) {
    const [id] = await db('localisations')
      .insert({
        sigle,
        libelle
      })
      .returning('id');

    return id;
  };

  async getAllLocalisation() {
    return await db('localisations');
  };

  async getOneLocalisation(id) {
    return await db('localisations').where({id}).first();
  };

  async removeLocalisation(id) {
    return await db('localisations').where({id}).del();
  };

  async updateLocalisation(id,changes) {
    return await db('localisations').where({id}).update(changes)
    .then(() =>{
      return db('localisations').where({id}).first();
    });
  };

 
}

module.exports = new LocalisationDAO();