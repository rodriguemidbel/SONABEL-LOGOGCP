const db = require('../db/db');

class TypeDAO {
  async createType(libelle) {
    const [id] = await db('types')
      .insert({
        libelle,
      })
      .returning('id');

    return id;
  };

  async getAllType() {
    return await db('types');
  };

  async getOneType(id) {
    return await db('types').where({id}).first();
  };

  async removeType(id) {
    return await db('types').where({id}).del();
  };

  async updateType(id,changes) {
    return await db('types').where({id}).update(changes)
    .then(() =>{
      return db('types').where({id}).first();
    });
  };

 
}

module.exports = new TypeDAO();