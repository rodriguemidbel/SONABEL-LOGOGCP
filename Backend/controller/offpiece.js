const offpieceService = require('../service/offpiece');

class OffpieceController {
  async createOffpiece(req, res) {
    try {
      const id = await offpieceService.createOffpiece(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllOffpiece(req, res) {
    try {
      const Offpieces = await offpieceService.getAllOffpiece();
      res.status(201).json(Offpieces);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneOffpiece(req, res) {
    try {
      const {id} = req.params;
      const Offpieces = await offpieceService.getOneOffpiece(id);
      if(Offpieces)
      {
        res.status(201).json(Offpieces);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeOffpiece(req, res) {
    try {
      const {id} = req.params;
      const count = await offpieceService.removeOffpiece(id);
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

  async updateOffpiece(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Offpieces = await offpieceService.updateOffpiece(id,changes);
      if(Offpieces)
      {
        res.status(201).json(Offpieces);
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

module.exports = new OffpieceController();