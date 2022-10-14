const courrierService = require('../service/courrier');

class CourrierController {
  async createCourrier(req, res) {
    try {
      const id = await courrierService.createCourrier(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllCourrier(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Courriers = await courrierService.getAllCourrier();
      res.status(201).json(Courriers);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneCourrier(req, res) {
    try {
      const {id} = req.params;
      const Courriers = await courrierService.getOneCourrier(id);
      if(Courriers)
      {
        res.status(201).json(Courriers);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCourrier(req, res) {
    try {
      const {id} = req.params;
      const count = await courrierService.removeCourrier(id);
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

  async updateCourrier(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Courriers = await courrierService.updateCourrier(id,changes);
      if(Courriers)
      {
        res.status(201).json(Courriers);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findCourrier(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await courrierService.findCourrier(dossier_id);
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

module.exports = new CourrierController();