const dospieceService = require('../service/dospiece');

class DospieceController {
  async createDospiece(req, res) {
    try {
      const id = await dospieceService.createDospiece(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllDospiece(req, res) {
    try {
      const Dospieces = await dospieceService.getAllDospiece();
      res.status(201).json(Dospieces);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneDospiece(req, res) {
    try {
      const {id} = req.params;
      const Dospieces = await dospieceService.getOneDospiece(id);
      if(Dospieces)
      {
        res.status(201).json(Dospieces);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeDospiece(req, res) {
    try {
      const {id} = req.params;
      const count = await dospieceService.removeDospiece(id);
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

  async updateDospiece(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Dospieces = await dospieceService.updateDospiece(id,changes);
      if(Dospieces)
      {
        res.status(201).json(Dospieces);
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

module.exports = new DospieceController();