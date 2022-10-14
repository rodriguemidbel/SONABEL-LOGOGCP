const receptionService = require('../service/reception');

class ReceptionController {
  async createReception(req, res) {
    try {
      const id = await receptionService.createReception(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllReception(req, res) {
    try {
      const Receptions = await receptionService.getAllReception();
      res.status(201).json(Receptions);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneReception(req, res) {
    try {
      const {id} = req.params;
      const Receptions = await receptionService.getOneReception(id);
      if(Receptions)
      {
        res.status(201).json(Receptions);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeReception(req, res) {
    try {
      const {id} = req.params;
      const count = await receptionService.removeReception(id);
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

  async updateReception(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Receptions = await receptionService.updateReception(id,changes);
      if(Receptions)
      {
        res.status(201).json(Receptions);
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

module.exports = new ReceptionController();