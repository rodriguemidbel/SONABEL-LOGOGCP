const db = require('../db/db');


class BudgetDAO {
  async createBudget(libelle) {
    const [id] = await db('budgets')
      .insert({
        libelle
      })
      .returning('id');

    return id;
  };

  async createMultipleBudget(libelle) {

    const budget = {
      id: number,
      libelle: string
    };
    return knex('budgets').insert([
       {libelle:budget.libelle}
    
    ]);
  };

  async getAllBudget() {
    return await db('budgets');
  };

  async getOneBudget(id) {
    return await db('budgets').where({id}).first();
  };

  async removeBudget(id) {
    return await db('budgets').where({id}).del();
  };

  async updateBudget(id,changes) {
    return await db('budgets').where({id}).update(changes)
    .then(() =>{
      return db('budgets').where({id}).first();
    });
  };

 
}

module.exports = new BudgetDAO();