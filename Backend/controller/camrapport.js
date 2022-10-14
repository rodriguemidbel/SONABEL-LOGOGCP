const camrapportService = require('../service/camrapport');

class CamrapportController {
  async createCamrapport(req, res) {
    try {
      const id = await camrapportService.createCamrapport(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllCamrapport(req, res) {
    try {
      const {dossier_id} = req.params;
      const Camrapports = await camrapportService.getAllCamrapport(dossier_id);
      res.status(201).json(Camrapports);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneCamrapport(req, res) {
    try {
      const {id} = req.params;
      const Camrapports = await camrapportService.getOneCamrapport(id);
      if(Camrapports)
      {
        res.status(201).json(Camrapports);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCamrapport(req, res) {
    try {
      const {id} = req.params;
      const count = await camrapportService.removeCamrapport(id);
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

  async updateCamrapport(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Camrapports = await camrapportService.updateCamrapport(id,changes);
      if(Camrapports)
      {
        res.status(201).json(Camrapports);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findCamrapport(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await camrapportService.findCamrapport(dossier_id);
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

module.exports = new CamrapportController();