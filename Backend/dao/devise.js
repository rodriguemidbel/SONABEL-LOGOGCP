const db = require('../db/db');


class DeviseDAO {
  async createDevise(libelle,symbole) {
    const [id] = await db('devises')
      .insert({
        libelle,
        symbole
      })
      .returning('id');

    return id;
  };



  async getAllDevise() {
    return await db('devises');
  };

  async getOneDevise(id) {
    return await db('devises').where({id}).first();
  };

  async removeDevise(id) {
    return await db('devises').where({id}).del();
  };

  async updateDevise(id,changes) {
    return await db('devises').where({id}).update(changes)
    .then(() =>{
      return db('devises').where({id}).first();
    });
  };

 
}

module.exports = new DeviseDAO();