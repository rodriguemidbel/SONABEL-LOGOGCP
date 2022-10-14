const db = require('../db/db');

class ResultatDAO {
  async createResultat(dossier_id,date_par_res,num_par_res,attributaire,litige,fichierpub,fichierlitige) {
    const [id] = await db('resultats')
      .insert({
        dossier_id,
        date_par_res,
        num_par_res,
        attributaire,
        litige,
        fichierpub,
        fichierlitige
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('resultats');
  };*/
  async getAllResultat(dossier_id) {
    return await db('resultats')
      .join('dossiers', 'dossiers.id', 'resultats.dossier_id')
      .join('planitems', 'planitems.id', 'dossiers.planitem_id')
      .join('fournisseurs','fournisseurs.id','resultats.attributaire')
      .select(
        'planitems.mode as mode',
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'resultats.id as id',
        'resultats.date_par_res as date_par_res',
        'resultats.num_par_res as num_par_res',
        'resultats.attributaire as attributaire',
        'resultats.litige as litige',
        'resultats.fichierpub as fichierpub',
        'resultats.fichierlitige as fichierlitige'
      )
      .where({dossier_id})
  };

  async getOneResultat(id) {
    return await db('resultats').where({id}).first();
  };

  async removeResultat(id) {
    return await db('resultats').where({id}).del();
  };

  async updateResultat(id,changes) {
    return await db('resultats').where({id}).update(changes)
    .then(() =>{
      return db('resultats').where({id}).first();
    });
  };

  async findResultat(dossier_id) {
    return await db('resultats')
    .join('dossiers', 'dossiers.id', 'resultats.dossier_id')
    .join('planitems', 'planitems.id', 'dossiers.planitem_id')
    .join('fournisseurs','fournisseurs.id','resultats.attributaire')
    .select(
      'planitems.mode as mode',
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'fournisseurs.id as fourID',
      'fournisseurs.nom_four as nom_four',
      'resultats.id as id',
      'resultats.date_par_res as date_par_res',
      'resultats.num_par_res as num_par_res',
      'resultats.attributaire as attributaire',
      'resultats.litige as litige',
      'resultats.fichierpub as fichierpub',
      'resultats.fichierlitige as fichierlitige'
    )
      .where({dossier_id})
  };

 
}

module.exports = new ResultatDAO();