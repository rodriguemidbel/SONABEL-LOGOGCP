const scaminvService = require('../service/scaminv');

class ScaminvController {
  async createScaminv(req, res) {
    try {
      const id = await scaminvService.createScaminv(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllScaminv(req, res) {
    try {
      const {dossier_id} = req.params;
      const Scaminvs = await scaminvService.getAllScaminv(dossier_id);
      res.status(201).json(Scaminvs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneScaminv(req, res) {
    try {
      const {id} = req.params;
      const Scaminvs = await scaminvService.getOneScaminv(id);
      if(Scaminvs)
      {
        res.status(201).json(Scaminvs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeScaminv(req, res) {
    try {
      const {id} = req.params;
      const count = await scaminvService.removeScaminv(id);
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

  async updateScaminv(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Scaminvs = await scaminvService.updateScaminv(id,changes);
      if(Scaminvs)
      {
        res.status(201).json(Scaminvs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findScaminv(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await scaminvService.findScaminv(dossier_id);
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

module.exports = new ScaminvController();