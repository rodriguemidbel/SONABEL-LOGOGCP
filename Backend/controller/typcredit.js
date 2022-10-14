const typcreditService = require('../service/typcredit');

class TypcreditController {
  async createTypcredit(req, res) {
    try {
      const id = await typcreditService.createTypcredit(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllTypcredit(req, res) {
    try {
      const Typcredits = await typcreditService.getAllTypcredit();
      res.status(201).json(Typcredits);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneTypcredit(req, res) {
    try {
      const {id} = req.params;
      const Typcredits = await typcreditService.getOneTypcredit(id);
      if(Typcredits)
      {
        res.status(201).json(Typcredits);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeTypcredit(req, res) {
    try {
      const {id} = req.params;
      const count = await typcreditService.removeTypcredit(id);
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

  async updateTypcredit(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Typcredits = await typcreditService.updateTypcredit(id,changes);
      if(Typcredits)
      {
        res.status(201).json(Typcredits);
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

module.exports = new TypcreditController();