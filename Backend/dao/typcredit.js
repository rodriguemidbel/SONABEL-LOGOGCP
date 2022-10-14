const db = require('../db/db');


class TypcreditDAO {
  async createTypcredit(libelle) {
    const [id] = await db('typcredits')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };

  async getAllTypcredit() {
    return await db('typcredits');
  };

  async getOneTypcredit(id) {
    return await db('typcredits').where({id}).first();
  };

  async removeTypcredit(id) {
    return await db('typcredits').where({id}).del();
  };

  async updateTypcredit(id,changes) {
    return await db('typcredits').where({id}).update(changes)
    .then(() =>{
      return db('typcredits').where({id}).first();
    });
  };

 
}

module.exports = new TypcreditDAO();