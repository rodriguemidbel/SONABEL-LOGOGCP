const modepaieService = require('../service/modepaiement');

class ModepaieController {
  async createModepaie(req, res) {
    try {
      const id = await modepaieService.createModepaie(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllModepaie(req, res) {
    try {
      const Modepaies = await modepaieService.getAllModepaie();
      res.status(201).json(Modepaies);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneModepaie(req, res) {
    try {
      const {id} = req.params;
      const Modepaies = await modepaieService.getOneModepaie(id);
      if(Modepaies)
      {
        res.status(201).json(Modepaies);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeModepaie(req, res) {
    try {
      const {id} = req.params;
      const count = await modepaieService.removeModepaie(id);
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

  async updateModepaie(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Modepaies = await modepaieService.updateModepaie(id,changes);
      if(Modepaies)
      {
        res.status(201).json(Modepaies);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findModepaie(req, res) {
    try {
      const {annee} = req.params;
      const item = await modepaieService.findModepaie(annee);
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

module.exports = new ModepaieController();