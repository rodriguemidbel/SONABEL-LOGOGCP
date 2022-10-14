const ventefrsService = require('../service/ventefrs');

class VentefrsController {
  async createVentefrs(req, res) {
    try {
      const id = await ventefrsService.createVentefrs(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllVentefrs(req, res) {
    try {

      const {vente_id} = req.params;
      const Ventefrs = await ventefrsService.getAllVentefrs(vente_id);
      res.status(201).json(Ventefrs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneVentefrs(req, res) {
    try {
      const {id} = req.params;
      const Ventefrs = await ventefrsService.getOneVentefrs(id);
      if(Ventefrs)
      {
        res.status(201).json(Ventefrs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeVentefrs(req, res) {
    try {
      const {id} = req.params;
      const count = await ventefrsService.removeVentefrs(id);
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

  async updateVentefrs(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Ventefrs = await ventefrsService.updateVentefrs(id,changes);
      if(Ventefrs)
      {
        res.status(201).json(Ventefrs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async getAllVenteFrsOffre(req, res) {
    try {

      const {offre_id} = req.params;
      const Ventefrs = await ventefrsService.getAllVenteFrsOffre(offre_id);
      res.status(201).json(Ventefrs);
    } catch (err) {
      console.error(err);
    }
  };

}

module.exports = new VentefrsController();