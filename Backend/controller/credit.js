const creditService = require('../service/credit');

class CreditController {
  async createCredit(req, res) {
    try {
      const id = await creditService.createCredit(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllCredit(req, res) {
    try {
      const Credits = await creditService.getAllCredit();
      res.status(201).json(Credits);
    } catch (err) {
      console.error(err);
    }
  };
  
  async getOneCredit(req, res) {
    try {
      const {id} = req.params;
      const Credits = await creditService.getOneCredit(id);
      if(Credits)
      {
        res.status(201).json(Credits);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCredit(req, res) {
    try {
      const {id} = req.params;
      const count = await creditService.removeCredit(id);
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

  async updateCredit(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Credits = await creditService.updateCredit(id,changes);
      if(Credits)
      {
        res.status(201).json(Credits);
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

module.exports = new CreditController();