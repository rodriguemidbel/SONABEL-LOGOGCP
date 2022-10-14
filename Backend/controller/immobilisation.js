const immobilisationService = require('../service/immobilisation');

class ImmobilisationController {
  async createImmobilisation(req, res) {
    try {
      const id = await immobilisationService.createImmobilisation(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllImmobilisation(req, res) {
    try {
      const Immobilisations = await immobilisationService.getAllImmobilisation();
      res.status(201).json(Immobilisations);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneImmobilisation(req, res) {
    try {
      const {id} = req.params;
      const Immobilisations = await immobilisationService.getOneImmobilisation(id);
      if(Immobilisations)
      {
        res.status(201).json(Immobilisations);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeImmobilisation(req, res) {
    try {
      const {id} = req.params;
      const count = await immobilisationService.removeImmobilisation(id);
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

  async updateImmobilisation(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Immobilisations = await immobilisationService.updateImmobilisation(id,changes);
      if(Immobilisations)
      {
        res.status(201).json(Immobilisations);
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

module.exports = new ImmobilisationController();