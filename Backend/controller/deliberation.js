const deliberationService = require('../service/deliberation');

class DeliberationController {
  async createDeliberation(req, res) {
    try {
      const id = await deliberationService.createDeliberation(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllDeliberation(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Deliberations = await deliberationService.getAllDeliberation();
      res.status(201).json(Deliberations);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneDeliberation(req, res) {
    try {
      const {id} = req.params;
      const Deliberations = await deliberationService.getOneDeliberation(id);
      if(Deliberations)
      {
        res.status(201).json(Deliberations);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeDeliberation(req, res) {
    try {
      const {id} = req.params;
      const count = await deliberationService.removeDeliberation(id);
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

  async updateDeliberation(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Deliberations = await deliberationService.updateDeliberation(id,changes);
      if(Deliberations)
      {
        res.status(201).json(Deliberations);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findDeliberation(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await deliberationService.findDeliberation(dossier_id);
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

module.exports = new DeliberationController();