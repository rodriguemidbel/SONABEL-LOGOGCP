const db = require('../db/db');

class ModepaiementDAO {
  async createModepaie(libelle) {
    const [id] = await db('modepaiements')
      .insert({
        libelle,
      })
      .returning('id');

    return id;
  };

  async getAllModepaie() {
    return await db('modepaiements');
  };

  async getOneModepaie(id) {
    return await db('modepaiements').where({id}).first();
  };

  async removeModepaie(id) {
    return await db('modepaiements').where({id}).del();
  };

  async updateModepaie(id,changes) {
    return await db('modepaiements').where({id}).update(changes)
    .then(() =>{
      return db('modepaiements').where({id}).first();
    });
  };

 
}

module.exports = new ModepaiementDAO();