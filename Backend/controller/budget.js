const budgetService = require('../service/budget');

class BudgetController {
  async createBudget(req, res) {
    try {
      const id = await budgetService.createBudget(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async createMultipleBudget(req, res) {
    try {
      await budgetService.createMultipleBudget(req.body);
      res.status(201).json();
    } catch (err) {
      console.error(err);
    }
  };


  async getAllBudget(req, res) {
    try {
      const budgets = await budgetService.getAllBudget();
      res.status(201).json(budgets);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneBudget(req, res) {
    try {
      const {id} = req.params;
      const budgets = await budgetService.getOneBudget(id);
      if(budgets)
      {
        res.status(201).json(budgets);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeBudget(req, res) {
    try {
      const {id} = req.params;
      const count = await budgetService.removeBudget(id);
      if(count > 0)
      {
        res.status(201).json({message : 'Successfuly deleted'});
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async updateBudget(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const budgets = await budgetService.updateBudget(id,changes);
      if(budgets)
      {
        res.status(201).json(budgets);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  
}

module.exports = new BudgetController();