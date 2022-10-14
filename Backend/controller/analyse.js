const analyseService = require('../service/analyse');

class AnalyseController {
  async createAnalyse(req, res) {
    try {
      const id = await analyseService.createAnalyse(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllAnalyse(req, res) {
    try {
      const {dossier_id} = req.params;
      const Analyses = await analyseService.getAllAnalyse(dossier_id);
      res.status(201).json(Analyses);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneAnalyse(req, res) {
    try {
      const {id} = req.params;
      const Analyses = await analyseService.getOneAnalyse(id);
      if(Analyses)
      {
        res.status(201).json(Analyses);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeAnalyse(req, res) {
    try {
      const {id} = req.params;
      const count = await analyseService.removeAnalyse(id);
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

  async updateAnalyse(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Analyses = await analyseService.updateAnalyse(id,changes);
      if(Analyses)
      {
        res.status(201).json(Analyses);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findAnalyse(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await analyseService.findAnalyse(dossier_id);
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

module.exports = new AnalyseController();