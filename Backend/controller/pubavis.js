const pubaviService = require('../service/pubavis');

class PubavisController {
  async createPubavis(req, res) {
    try {
      const id = await pubaviService.createPubavis(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllPubavis(req, res) {
    try {
      const {dossier_id} = req.params;
      const Pubaviss = await pubaviService.getAllPubavis(dossier_id);
      res.status(201).json(Pubaviss);
    } catch (err) {
      console.error(err);
    }
  };
  async getOnePubavis(req, res) {
    try {
      const {id} = req.params;
      const Pubaviss = await pubaviService.getOnePubavis(id);
      if(Pubaviss)
      {
        res.status(201).json(Pubaviss);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePubavis(req, res) {
    try {
      const {id} = req.params;
      const count = await pubaviService.removePubavis(id);
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

  async updatePubavis(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Pubaviss = await pubaviService.updatePubavis(id,changes);
      if(Pubaviss)
      {
        res.status(201).json(Pubaviss);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findPubavis(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await pubaviService.findPubavis(dossier_id);
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

module.exports = new PubavisController();