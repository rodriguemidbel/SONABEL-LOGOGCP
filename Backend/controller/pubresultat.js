const pubresultatService = require('../service/pubresultats');

class PubresultatController {
  async createPubresultat(req, res) {
    try {
      const id = await pubresultatService.createPubresultat(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllPubresultat(req, res) {
    try {
      const {dossier_id} = req.params;
      const Pubresultats = await pubresultatService.getAllPubresultat(dossier_id);
      res.status(201).json(Pubresultats);
    } catch (err) {
      console.error(err);
    }
  };
  async getOnePubresultat(req, res) {
    try {
      const {id} = req.params;
      const Pubresultats = await pubresultatService.getOnePubresultat(id);
      if(Pubresultats)
      {
        res.status(201).json(Pubresultats);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePubresultat(req, res) {
    try {
      const {id} = req.params;
      const count = await pubresultatService.removePubresultat(id);
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

  async updatePubresultat(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Pubresultats = await pubresultatService.updatePubresultat(id,changes);
      if(Pubresultats)
      {
        res.status(201).json(Pubresultats);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findPubresultat(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await pubresultatService.findPubresultat(dossier_id);
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

module.exports = new PubresultatController();