const OrdrerepriseService = require('../service/ordrereprise');

class OrdrerepriseController {
  async createOrdrerep(req, res) {
    try {
      const id = await OrdrerepriseService.createOrdrerep(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllOrdrerep(req, res) {
    try {
      //const {marche_id} = req.params;
      const Ordrerep = await OrdrerepriseService.getAllOrdrerep();
      res.status(201).json(Ordrerep);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneOrdrerep(req, res) {
    try {
      const {id} = req.params;
      const Ordrerep = await OrdrerepriseService.getOneOrdrerep(id);
      if(Ordrerep)
      {
        res.status(201).json(Ordrerep);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeOrdrerep(req, res) {
    try {
      const {id} = req.params;
      const count = await OrdrerepriseService.removeOrdrerep(id);
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

  async updateOrdrerep(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Ordrerep = await OrdrerepriseService.updateOrdrerep(id,changes);
      if(Ordrerep)
      {
        res.status(201).json(Ordrerep);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findOrdrerep(req, res) {
    try {
      const {marche_id} = req.params;
      const item = await OrdrerepriseService.findOrdrerep(marche_id);
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

module.exports = new OrdrerepriseController();