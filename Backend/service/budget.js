const budgetDAO = require('../dao/budget');

class BudgetService {
  createBudget(BudgetDto) {
    const { libelle } = BudgetDto;
    return budgetDAO.createBudget(libelle);
  };

  createMultipleBudget(data) {
    return budgetDAO.createBudget(data);
  };


  getAllBudget() {
    return budgetDAO.getAllBudget();
  };
  getOneBudget(id) {
    return budgetDAO.getOneBudget(id);
  };
  removeBudget(id) {
    return budgetDAO.removeBudget(id);
  };
  updateBudget(id,changes) {
    return budgetDAO.updateBudget(id,changes);
  };
  
}

module.exports = new BudgetService();