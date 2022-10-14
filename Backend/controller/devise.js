const deviseService = require('../service/devise');

class DeviseController {
  async createDevise(req, res) {
    try {
      const id = await deviseService.createDevise(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllDevise(req, res) {
    try {
      const Devises = await deviseService.getAllDevise();
      res.status(201).json(Devises);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneDevise(req, res) {
    try {
      const {id} = req.params;
      const Devises = await deviseService.getOneDevise(id);
      if(Devises)
      {
        res.status(201).json(Devises);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeDevise(req, res) {
    try {
      const {id} = req.params;
      const count = await deviseService.removeDevise(id);
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

  async updateDevise(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Devises = await deviseService.updateDevise(id,changes);
      if(Devises)
      {
        res.status(201).json(Devises);
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

module.exports = new DeviseController();