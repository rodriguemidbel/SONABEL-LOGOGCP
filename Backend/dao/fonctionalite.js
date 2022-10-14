const db = require('../db/db');


class FonctionaliteDAO {
  async createFonctionalite(libelle,description) {
    const [id] = await db('fonctionalites')
      .insert({
        libelle,
        description
      })
      .returning('id');

    return id;
  };

  async getAllFonctionalite() {
    return await db('fonctionalites');
  };

  async getOneFonctionalite(id) {
    return await db('fonctionalites').where({id}).first();
  };

  async removeFonctionalite(id) {
    return await db('fonctionalites').where({id}).del();
  };

  async updateFonctionalite(id,changes) {
    return await db('fonctionalites').where({id}).update(changes)
    .then(() =>{
      return db('fonctionalites').where({id}).first();
    });
  };

 
}

module.exports = new FonctionaliteDAO();