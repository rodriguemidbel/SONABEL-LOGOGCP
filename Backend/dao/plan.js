const db = require('../db/db');

class PlanDAO {
  async createPlan(annee,date_plan,statut) {
    const [id] = await db('plans')
      .insert({
        annee,
        date_plan,
        statut
      })
      .returning('id');

    return id;
  };

  async getAllPlan() {
    return await db('plans');
  };

  async getOnePlan(id) {
    return await db('plans').where({id}).first();
  };

  async removePlan(id) {
    return await db('plans').where({id}).del();
  };

  async updatePlan(id,changes) {
    return await db('plans').where({id}).update(changes)
    .then(() =>{
      return db('plans').where({id}).first();
    });
  };

  async findPlan(annee) {
    return await db('plans')
      .select(
        'plans.id as planID',
        'plans.annee as annee',
        'plans.date_plan as date',
      )
      .where({annee})
  };

  

 
}

module.exports = new PlanDAO();