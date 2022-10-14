const db = require('../db/db');

class OrdrerepriseDAO {
  async createOrdrerep(marche_id,ref,date_notif,date_reprise,ordre) {
    const [id] = await db('ordrereprises')
      .insert({
        marche_id,
        ref,
        date_notif,
        date_reprise,
        ordre
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('ordrereprises');
  };*/
  async getAllOrdrerep() {
    return await db('ordrereprises')
    .join('marches', 'marches.id', 'ordrereprises.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'ordrereprises.id as id',
      'ordrereprises.ref as ref',
      'ordrereprises.date_notif as date_notif',
      'ordrereprises.date_reprise as date_reprise',
      'ordrereprises.ordre as ordre'
    )
  };

  async getOneOrdrerep(id) {
    return await db('ordrereprises').where({id}).first();
  };

  async removeOrdrerep(id) {
    return await db('ordrereprises').where({id}).del();
  };

  async updateOrdrerep(id,changes) {
    return await db('ordrereprises').where({id}).update(changes)
    .then(() =>{
      return db('ordrereprises').where({id}).first();
    });
  };

  async findOrdrerep(marche_id) {
    return await db('ordrereprises')
    .join('marches', 'marches.id', 'ordrereprises.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'ordrereprises.id as id',
      'ordrereprises.ref as ref',
      'ordrereprises.date_notif as date_notif',
      'ordrereprises.date_reprise as date_reprise',
      'ordrereprises.ordre as ordre'
    )
    .where({marche_id})
  };

 
}

module.exports = new OrdrerepriseDAO();