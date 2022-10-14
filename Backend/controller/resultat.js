const resultatService = require('../service/resultat');

class ResultatController {
  async createResultat(req, res) {
    try {
      const id = await resultatService.createResultat(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllResultat(req, res) {
    try {
      const {dossier_id} = req.params;
      const Resultats = await resultatService.getAllResultat(dossier_id);
      res.status(201).json(Resultats);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneResultat(req, res) {
    try {
      const {id} = req.params;
      const Resultats = await resultatService.getOneResultat(id);
      if(Resultats)
      {
        res.status(201).json(Resultats);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeResultat(req, res) {
    try {
      const {id} = req.params;
      const count = await resultatService.removeResultat(id);
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

  async updateResultat(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Resultats = await resultatService.updateResultat(id,changes);
      if(Resultats)
      {
        res.status(201).json(Resultats);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findResultat(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await resultatService.findResultat(dossier_id);
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

module.exports = new ResultatController();