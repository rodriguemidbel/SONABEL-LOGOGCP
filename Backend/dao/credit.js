const db = require('../db/db');


class CreditDAO {
  async createCredit(libelle) {
    const [id] = await db('credits')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };

  async getAllCredit() {
    return await db('credits');
  };

  async getOneCredit(id) {
    return await db('credits').where({id}).first();
  };

  async removeCredit(id) {
    return await db('credits').where({id}).del();
  };

  async updateCredit(id,changes) {
    return await db('credits').where({id}).update(changes)
    .then(() =>{
      return db('credits').where({id}).first();
    });
  };

 
}

module.exports = new CreditDAO();