const db = require('../db/db');


class PieceDAO {
  async createPiece(libelle) {
    const [id] = await db('pieces')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };


  async getAllPiece() {
    return await db('pieces');
  };

  async getOnePiece(id) {
    return await db('pieces').where({id}).first();
  };

  async removePiece(id) {
    return await db('pieces').where({id}).del();
  };

  async updatePiece(id,changes) {
    return await db('pieces').where({id}).update(changes)
    .then(() =>{
      return db('pieces').where({id}).first();
    });
  };

 
}

module.exports = new PieceDAO();