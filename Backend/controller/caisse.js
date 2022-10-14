const caisseService = require('../service/caisse');

class CaisseController {
  async createCaisse(req, res) {
    try {
      const id = await caisseService.createCaisse(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllCaisse(req, res) {
    try {
      const Caisses = await caisseService.getAllCaisse();
      res.status(201).json(Caisses);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneCaisse(req, res) {
    try {
      const {id} = req.params;
      const Caisses = await caisseService.getOneCaisse(id);
      if(Caisses)
      {
        res.status(201).json(Caisses);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCaisse(req, res) {
    try {
      const {id} = req.params;
      const count = await caisseService.removeCaisse(id);
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

  async updateCaisse(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Caisses = await caisseService.updateCaisse(id,changes);
      if(Caisses)
      {
        res.status(201).json(Caisses);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findCaisse(req, res) {
    try {
      const {vente_id} = req.params;
      const item = await caisseService.findCaisse(vente_id);
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

module.exports = new CaisseController();