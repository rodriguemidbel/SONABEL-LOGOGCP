const db = require('../db/db');


class DospieceDAO {
  async createDospiece(dossier_id,piece_id) {
    const [id] = await db('dospieces')
      .insert({
        dossier_id,
        piece_id
      })
      .returning('id');

    return id;
  };


  async getAllDospiece() {
    return await db('dospieces');
  };

  async getOneDospiece(id) {
    return await db('dospieces').where({id}).first();
  };

  async removeDospiece(id) {
    return await db('dospieces').where({id}).del();
  };

  async updateDospiece(id,changes) {
    return await db('dospieces').where({id}).update(changes)
    .then(() =>{
      return db('dospieces').where({id}).first();
    });
  };

 
}

module.exports = new DospieceDAO();