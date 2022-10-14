const caminvService = require('../service/caminv');

class CaminvController {
  async createCaminv(req, res) {
    try {
      const id = await caminvService.createCaminv(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllCaminv(req, res) {
    try {
      const {dossier_id} = req.params;
      const Caminvs = await caminvService.getAllCaminv(dossier_id);
      res.status(201).json(Caminvs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneCaminv(req, res) {
    try {
      const {id} = req.params;
      const Caminvs = await caminvService.getOneCaminv(id);
      if(Caminvs)
      {
        res.status(201).json(Caminvs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCaminv(req, res) {
    try {
      const {id} = req.params;
      const count = await caminvService.removeCaminv(id);
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

  async updateCaminv(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Caminvs = await caminvService.updateCaminv(id,changes);
      if(Caminvs)
      {
        res.status(201).json(Caminvs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findCaminv(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await caminvService.findCaminv(dossier_id);
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

module.exports = new CaminvController();