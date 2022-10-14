const db = require('../db/db');

class FournisseurDAO {
  async createFournisseur(nom_four,rccm,ifu,telephone1,telephone2,adresse,email,domaine,type) {
    const [id] = await db('fournisseurs')
      .insert({
        nom_four,
        rccm,
        ifu,
        telephone1,
        telephone2,
        adresse,
        email,
        domaine,
        type
      })
      .returning('id');

    return id;
  };

  async getAllFournisseur() {
    return await db('fournisseurs');
  };

  async getOneFournisseur(id) {
    return await db('fournisseurs').where({id}).first();
  };

  async removeFournisseur(id) {
    return await db('fournisseurs').where({id}).del();
  };

  async updateFournisseur(id,changes) {
    return await db('fournisseurs').where({id}).update(changes)
    .then(() =>{
      return db('fournisseurs').where({id}).first();
    });
  };

  

 
}

module.exports = new FournisseurDAO();