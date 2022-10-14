const Ordresuservice = require('../service/ordresuspension');

class OrdresuspensionController {
  async createOrdresus(req, res) {
    try {
      const id = await Ordresuservice.createOrdresus(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllOrdresus(req, res) {
    try {
      //const {marche_id} = req.params;
      const Ordresus = await Ordresuservice.getAllOrdresus();
      res.status(201).json(Ordresus);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneOrdresus(req, res) {
    try {
      const {id} = req.params;
      const Ordresus = await Ordresuservice.getOneOrdresus(id);
      if(Ordresus)
      {
        res.status(201).json(Ordresus);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeOrdresus(req, res) {
    try {
      const {id} = req.params;
      const count = await Ordresuservice.removeOrdresus(id);
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

  async updateOrdresus(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Ordresus = await Ordresuservice.updateOrdresus(id,changes);
      if(Ordresus)
      {
        res.status(201).json(Ordresus);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findOrdresus(req, res) {
    try {
      const {marche_id} = req.params;
      const item = await Ordresuservice.findOrdresus(marche_id);
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

module.exports = new OrdresuspensionController();