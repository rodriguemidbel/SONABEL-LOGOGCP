const agentService = require('../service/agent');

class AgentController {
  async createAgent(req, res) {
    try {
      const id = await agentService.createAgent(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllAgent(req, res) {
    try {
      const Agents = await agentService.getAllAgent();
      res.status(201).json(Agents);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneAgent(req, res) {
    try {
      const {id} = req.params;
      const Agents = await agentService.getOneAgent(id);
      if(Agents)
      {
        res.status(201).json(Agents);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeAgent(req, res) {
    try {
      const {id} = req.params;
      const count = await agentService.removeAgent(id);
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

  async updateAgent(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Agents = await agentService.updateAgent(id,changes);
      if(Agents)
      {
        res.status(201).json(Agents);
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

module.exports = new AgentController();