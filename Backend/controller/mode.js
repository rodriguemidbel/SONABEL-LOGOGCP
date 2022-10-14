const modeService = require('../service/mode');

class ModeController {
  async createMode(req, res) {
    try {
      const id = await modeService.createMode(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllMode(req, res) {
    try {
      const modes = await modeService.getAllMode();
      res.status(201).json(modes);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneMode(req, res) {
    try {
      const {id} = req.params;
      const modes = await modeService.getOneMode(id);
      if(modes)
      {
        res.status(201).json(modes);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeMode(req, res) {
    try {
      const {id} = req.params;
      const count = await modeService.removeMode(id);
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

  async updateMode(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const modes = await modeService.updateMode(id,changes);
      if(modes)
      {
        res.status(201).json(modes);
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

module.exports = new ModeController();