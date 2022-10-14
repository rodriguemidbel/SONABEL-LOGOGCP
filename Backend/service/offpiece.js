const db = require('../db/db');


class OffpieceDAO {
  async createOffpiece(offre_id,piece_id) {
    const [id] = await db('offpieces')
      .insert({
        offre_id,
        piece_id
      })
      .returning('id');

    return id;
  };


  async getAllOffpiece() {
    return await db('offpieces');
  };

  async getOneOffpiece(id) {
    return await db('offpieces').where({id}).first();
  };

  async removeOffpiece(id) {
    return await db('offpieces').where({id}).del();
  };

  async updateOffpiece(id,changes) {
    return await db('offpieces').where({id}).update(changes)
    .then(() =>{
      return db('offpieces').where({id}).first();
    });
  };

 
}

module.exports = new OffpieceDAO();