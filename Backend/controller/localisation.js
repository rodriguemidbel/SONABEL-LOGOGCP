const localisationService = require('../service/localisation');

class LocalisationController {
  async createLocalisation(req, res) {
    try {
      const id = await localisationService.createLocalisation(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllLocalisation(req, res) {
    try {
      const Localisations = await localisationService.getAllLocalisation();
      res.status(201).json(Localisations);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneLocalisation(req, res) {
    try {
      const {id} = req.params;
      const Localisations = await localisationService.getOneLocalisation(id);
      if(Localisations)
      {
        res.status(201).json(Localisations);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeLocalisation(req, res) {
    try {
      const {id} = req.params;
      const count = await localisationService.removeLocalisation(id);
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

  async updateLocalisation(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Localisations = await localisationService.updateLocalisation(id,changes);
      if(Localisations)
      {
        res.status(201).json(Localisations);
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

module.exports = new LocalisationController();