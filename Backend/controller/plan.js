const planService = require('../service/plan');

class PlanController {
  async createPlan(req, res) {
    try {
      const id = await planService.createPlan(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllPlan(req, res) {
    try {
      const plans = await planService.getAllPlan();
      res.status(201).json(plans);
    } catch (err) {
      console.error(err);
    }
  };
  async getOnePlan(req, res) {
    try {
      const {id} = req.params;
      const plans = await planService.getOnePlan(id);
      if(plans)
      {
        res.status(201).json(plans);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePlan(req, res) {
    try {
      const {id} = req.params;
      const count = await planService.removePlan(id);
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

  async updatePlan(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const plans = await planService.updatePlan(id,changes);
      if(plans)
      {
        res.status(201).json(plans);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  
  async findPlan(req, res) {
    try {
      const {annee} = req.params;
      const item = await planService.findPlan(annee);
      if(item)
      {
        res.status(201).json(item);
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

module.exports = new PlanController();