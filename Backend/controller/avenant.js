const AvenantService = require('../service/avenant');

class AvenantController {
  async createAvenant(req, res) {
    try {
      const id = await AvenantService.createAvenant(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllAvenant(req, res) {
    try {
      //const {marche_id} = req.params;
      const Avenant = await AvenantService.getAllAvenant();
      res.status(201).json(Avenant);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneAvenant(req, res) {
    try {
      const {id} = req.params;
      const Avenant = await AvenantService.getOneAvenant(id);
      if(Avenant)
      {
        res.status(201).json(Avenant);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeAvenant(req, res) {
    try {
      const {id} = req.params;
      const count = await AvenantService.removeAvenant(id);
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

  async updateAvenant(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Avenant = await AvenantService.updateAvenant(id,changes);
      if(Avenant)
      {
        res.status(201).json(Avenant);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findAvenant(req, res) {
    try {
      const {marche_id} = req.params;
      const item = await AvenantService.findAvenant(marche_id);
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

module.exports = new AvenantController();