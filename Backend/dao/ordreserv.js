const db = require('../db/db');

class OrdreservDAO {
  async createOrdreserv(marche_id,ref,date_notif,date_debut,ordre) {
    const [id] = await db('ordreservs')
      .insert({
        marche_id,
        ref,
        date_notif,
        date_debut,
        ordre
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('ordreservs');
  };*/
  async getAllOrdreserv() {
    return await db('ordreservs')
      .join('marches', 'marches.id', 'ordreservs.marche_id')
      .select(
        'marches.num_ref as num_ref',
        'marches.objet as objet',
        'marches.attributaire as attributaire',
        'marches.montant as montant',
        'marches.delai as delai',
        'ordreservs.id as id',
        'ordreservs.ref as ref',
        'ordreservs.date_notif as date_notif',
        'ordreservs.date_debut as date_debut',
        'ordreservs.ordre as ordre'
        
      )
  };

  async getOneOrdreserv(id) {
    return await db('ordreservs').where({id}).first();
  };

  async removeOrdreserv(id) {
    return await db('ordreservs').where({id}).del();
  };

  async updateOrdreserv(id,changes) {
    return await db('ordreservs').where({id}).update(changes)
    .then(() =>{
      return db('ordreservs').where({id}).first();
    });
  };

  async findOrdreserv(marche_id) {
    return await db('ordreservs')
    .join('marches', 'marches.id', 'ordreservs.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'ordreservs.id as id',
      'ordreservs.ref as ref',
      'ordreservs.date_notif as date_notif',
      'ordreservs.date_debut as date_debut',
      'ordreservs.ordre as ordre'
    )
    .where({marche_id})
  };

 
}

module.exports = new OrdreservDAO();