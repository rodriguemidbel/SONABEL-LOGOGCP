const aviService = require('../service/avi');

class AviController {
  async createAvi(req, res) {
    try {
      const id = await aviService.createAvi(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllAvi(req, res) {
    try {
      const {dossier_id} = req.params;
      const Avis = await aviService.getAllAvi(dossier_id);
      res.status(201).json(Avis);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneAvi(req, res) {
    try {
      const {id} = req.params;
      const Avis = await aviService.getOneAvi(id);
      if(Avis)
      {
        res.status(201).json(Avis);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeAvi(req, res) {
    try {
      const {id} = req.params;
      const count = await aviService.removeAvi(id);
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

  async updateAvi(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Avis = await aviService.updateAvi(id,changes);
      if(Avis)
      {
        res.status(201).json(Avis);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findAvi(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await aviService.findAvi(dossier_id);
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

module.exports = new AviController();