const db = require('../db/db');

class DossiertechDAO {
  async createDossiertech(planitem_id,date_tech_reel,service,dossiertech) {
    const [id] = await db('dossiertechs')
      .insert({
        planitem_id,
        date_tech_reel,
        service,
        dossiertech
      })
      .returning('id');

    return id;
  };

  
  async getAllDossiertech() {
    return await db('dossiertechs')
    .join('planitems', 'planitems.id', 'dossiertechs.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as id',
      'planitems.designation as designation',
      'dossiertechs.id as dossiertechID',
      'dossiertechs.date_tech_reel as date_tech_reel',
      'dossiertechs.service as service',
      'dossiertechs.dossiertech as dossiertech'
    )
  };

  async getOneDossiertech(id) {
    return await db('dossiertechs').where({id}).first();
  };

  async removeDossiertech(id) {
    return await db('dossiertechs').where({id}).del();
  };

  async updateDossiertech(id,changes) {
    return await db('dossiertechs').where({id}).update(changes)
    .then(() =>{
      return db('dossiertechs').where({id}).first();
    });
  };

  async findDossiertech(annee) {
    return await db('dossiertechs')
    .join('planitems', 'planitems.id', 'dossiertechs.planitem_id')
    .join('plans', 'plans.id', 'planitems.plan_id')
    .select(
      'plans.id as planID',
      'plans.annee as annee',
      'plans.statut as statut',
      'planitems.id as id',
      'planitems.designation as designation',
      'dossiertechs.id as dossiertechID',
      'dossiertechs.date_tech_reel as date_tech_reel',
      'dossiertechs.service as service',
      'dossiertechs.dossiertech as dossiertech'
    )
    .where({annee})
    .orderBy('dossiertechs.id', 'asc')
  };


 
}

module.exports = new DossiertechDAO();