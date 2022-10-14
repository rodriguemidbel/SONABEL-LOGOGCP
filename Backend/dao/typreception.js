const db = require('../db/db');


class TypreceptionDAO {
  async createTypreception(libelle) {
    const [id] = await db('typreceptions')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };

  async getAllTypreception() {
    return await db('typreceptions');
  };

  async getOneTypreception(id) {
    return await db('typreceptions').where({id}).first();
  };

  async removeTypreception(id) {
    return await db('typreceptions').where({id}).del();
  };

  async updateTypreception(id,changes) {
    return await db('typreceptions').where({id}).update(changes)
    .then(() =>{
      return db('typreceptions').where({id}).first();
    });
  };

 
}

module.exports = new TypreceptionDAO();