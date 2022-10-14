const db = require('../db/db');

class OrdresuspensionDAO {
  async createOrdresus(marche_id,ref,date_notif,date_suspension,ordre) {
    const [id] = await db('ordresuspensions')
      .insert({
        marche_id,
        ref,
        date_notif,
        date_suspension,
        ordre
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('ordresuspensions');
  };*/
  async getAllOrdresus() {
    return await db('ordresuspensions')
    .join('marches', 'marches.id', 'ordresuspensions.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'ordresuspensions.id as id',
      'ordresuspensions.ref as ref',
      'ordresuspensions.date_notif as date_notif',
      'ordresuspensions.date_suspension as date_suspension',
      'ordresuspensions.ordre as ordre'
    )
  };

  async getOneOrdresus(id) {
    return await db('ordresuspensions').where({id}).first();
  };

  async removeOrdresus(id) {
    return await db('ordresuspensions').where({id}).del();
  };

  async updateOrdresus(id,changes) {
    return await db('ordresuspensions').where({id}).update(changes)
    .then(() =>{
      return db('ordresuspensions').where({id}).first();
    });
  };

  async findOrdresus(marche_id) {
    return await db('ordresuspensions')
    .join('marches', 'marches.id', 'ordresuspensions.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'ordresuspensions.id as id',
      'ordresuspensions.ref as ref',
      'ordresuspensions.date_notif as date_notif',
      'ordresuspensions.date_suspension as date_suspension',
      'ordresuspensions.ordre as ordre'
    )
    .where({marche_id})
  };

 
}

module.exports = new OrdresuspensionDAO();