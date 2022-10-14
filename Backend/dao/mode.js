const db = require('../db/db');

class ModeDAO {
  async createMode(libelle) {
    const [id] = await db('modes')
      .insert({
        libelle,
      })
      .returning('id');

    return id;
  };

  async getAllMode() {
    return await db('modes');
  };

  async getOneMode(id) {
    return await db('modes').where({id}).first();
  };

  async removeMode(id) {
    return await db('modes').where({id}).del();
  };

  async updateMode(id,changes) {
    return await db('modes').where({id}).update(changes)
    .then(() =>{
      return db('modes').where({id}).first();
    });
  };

 
}

module.exports = new ModeDAO();