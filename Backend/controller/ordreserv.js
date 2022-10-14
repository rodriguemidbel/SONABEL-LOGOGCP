const ordreservService = require('../service/ordreserv');

class OrdreservController {
  async createOrdreserv(req, res) {
    try {
      const id = await ordreservService.createOrdreserv(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllOrdreserv(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Ordreservs = await ordreservService.getAllOrdreserv();
      res.status(201).json(Ordreservs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneOrdreserv(req, res) {
    try {
      const {id} = req.params;
      const Ordreservs = await ordreservService.getOneOrdreserv(id);
      if(Ordreservs)
      {
        res.status(201).json(Ordreservs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeOrdreserv(req, res) {
    try {
      const {id} = req.params;
      const count = await ordreservService.removeOrdreserv(id);
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

  async updateOrdreserv(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Ordreservs = await ordreservService.updateOrdreserv(id,changes);
      if(Ordreservs)
      {
        res.status(201).json(Ordreservs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findOrdreserv(req, res) {
    try {
      const {marche_id} = req.params;
      const item = await ordreservService.findOrdreserv(marche_id);
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

module.exports = new OrdreservController();