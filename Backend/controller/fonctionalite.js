const fonctionaliteService = require('../service/fonctionalite');

class FonctionaliteController {
  async createFonctionalite(req, res) {
    try {
      const id = await fonctionaliteService.createFonctionalite(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllFonctionalite(req, res) {
    try {
      const Fonctionalites = await fonctionaliteService.getAllFonctionalite();
      res.status(201).json(Fonctionalites);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneFonctionalite(req, res) {
    try {
      const {id} = req.params;
      const Fonctionalites = await fonctionaliteService.getOneFonctionalite(id);
      if(Fonctionalites)
      {
        res.status(201).json(Fonctionalites);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeFonctionalite(req, res) {
    try {
      const {id} = req.params;
      const count = await fonctionaliteService.removeFonctionalite(id);
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

  async updateFonctionalite(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Fonctionalites = await fonctionaliteService.updateFonctionalite(id,changes);
      if(Fonctionalites)
      {
        res.status(201).json(Fonctionalites);
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

module.exports = new FonctionaliteController();