const scamrapportService = require('../service/scamrapport');

class ScamrapportController {
  async createScamrapport(req, res) {
    try {
      const id = await scamrapportService.createScamrapport(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllScamrapport(req, res) {
    try {
      const {dossier_id} = req.params;
      const Scamrapports = await scamrapportService.getAllScamrapport(dossier_id);
      res.status(201).json(Scamrapports);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneScamrapport(req, res) {
    try {
      const {id} = req.params;
      const Scamrapports = await scamrapportService.getOneScamrapport(id);
      if(Scamrapports)
      {
        res.status(201).json(Scamrapports);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeScamrapport(req, res) {
    try {
      const {id} = req.params;
      const count = await scamrapportService.removeScamrapport(id);
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

  async updateScamrapport(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Scamrapports = await scamrapportService.updateScamrapport(id,changes);
      if(Scamrapports)
      {
        res.status(201).json(Scamrapports);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findScamrapport(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await scamrapportService.findScamrapport(dossier_id);
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

module.exports = new ScamrapportController();