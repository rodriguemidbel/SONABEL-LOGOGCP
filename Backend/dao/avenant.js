const db = require('../db/db');

class AvenantDAO {
  async createAvenant(marche_id,num_avenant,date_avenant,objet_avenant,motif_avenant,montant_avenant,delai_avenant) {
    const [id] = await db('avenants')
      .insert({
        marche_id,
        num_avenant,
        date_avenant,
        objet_avenant,
        motif_avenant,
        montant_avenant,
        delai_avenant
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('ordreservs');
  };*/
  async getAllAvenant() {
    return await db('avenants')
      .join('marches', 'marches.id', 'avenants.marche_id')
      .select(
        'marches.num_ref as num_ref',
        'marches.objet as objet',
        'marches.attributaire as attributaire',
        'marches.montant as montant',
        'marches.delai as delai',
        'avenants.id as id',
        'avenants.nature_avenant as nature_avenant',
        'avenants.montant as montant',
        'avenants.date_avenant as date_avenant'
        
      )
  };

  async getOneAvenant(id) {
    return await db('avenants').where({id}).first();
  };

  async removeAvenant(id) {
    return await db('avenants').where({id}).del();
  };

  async updateAvenant(id,changes) {
    return await db('avenants').where({id}).update(changes)
    .then(() =>{
      return db('avenants').where({id}).first();
    });
  };

  async findAvanant(marche_id) {
    return await db('avenants')
    .join('marches', 'marches.id', 'avenants.marche_id')
    .select(
      'marches.num_ref as num_ref',
      'marches.objet as objet',
      'marches.attributaire as attributaire',
      'marches.montant as montant',
      'marches.delai as delai',
      'avenants.id as id',
      'avenants.nature_avenant as nature_avenant',
      'avenants.montant as montant',
      'avenants.date_avenant as date_avenant'
      
    )
    .where({marche_id})
  };

 
}

module.exports = new AvenantDAO();