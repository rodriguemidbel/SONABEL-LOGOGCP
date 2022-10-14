const planDAO = require('../dao/plan');

class PlanService {
  createPlan(PlanDto) {
    const { annee,date_plan,statut } = PlanDto;
    return planDAO.createPlan(annee,date_plan,statut);
  };
  getAllPlan() {
    return planDAO.getAllPlan();
  };
  getOnePlan(id) {
    return planDAO.getOnePlan(id);
  };
  removePlan(id) {
    return planDAO.removePlan(id);
  };
  updatePlan(id,changes) {
    return planDAO.updatePlan(id,changes);
  };

  findPlan(annee){
    return planDAO.findPlan(annee);
  };
  
}

module.exports = new PlanService();