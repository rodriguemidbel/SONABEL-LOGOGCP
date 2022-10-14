const planitemService = require('../service/planitem');

class PlanitemController {
  
  

  async createPlanitem(req, res) {
    try {
      const id = await planitemService.createPlanitem(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllPlanitem(req, res) {
    try {
      const items = await planitemService.getAllPlanitem();
      res.status(201).json(items);
    } catch (err) {
      console.error(err);
    }
  };
  async getOnePlanitem(req, res) {
    try {
      const {id} = req.params;
      const items = await planitemService.getOnePlanitem(id);
      if(items)
      {
        res.status(201).json(items);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePlanitem(req, res) {
    try {
      const {id} = req.params;
      const count = await planitemService.removePlanitem(id);
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

  async updatePlanitem(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const items = await planitemService.updatePlanitem(id,changes);
      if(items)
      {
        res.status(201).json(items);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findPlanitem(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.findPlanitem(annee);
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

  async findPlanitemByAgent(req, res) {
    try {
      const {agent_id,annee} = req.params;
      const item = await planitemService.findPlanitemByAgent(agent_id,annee);
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

  async nbrTotalLigne(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrTotalLigne(annee);
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

  async nbrReception(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrReception(annee);
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

  async nbrLancement(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLancement(annee);
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
 /**-------LOca */
  async nbrLigneLoca(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneLoca(annee);
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

  async nbrLigneLocaDosstech(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneLocaDosstech(annee);
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
  
  async nbrLigneLocaLance(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneLocaLance(annee);
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
  /*-----------------*/

  async nbrLigneMode(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneMode(annee);
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
  /*---------------------------*/
  async nbrLigneAgent(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneAgent(annee);
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

  async nbrLigneAgentDosstech(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneAgentDosstech(annee);
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

  async nbrLigneAgentLance(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneAgentLance(annee);
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

  /*-----------------------------*/
  async nbrToatlLigneGroup(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrToatlLigneGroup(annee);
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



  async nbrLigneAgent(req, res) {
    try {
      const {annee} = req.params;
      const item = await planitemService.nbrLigneAgent(annee);
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

module.exports = new PlanitemController();