const typreceptionService = require('../service/typreception');

class TypreceptionController {
  async createTypreception(req, res) {
    try {
      const id = await typreceptionService.createTypreception(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllTypreception(req, res) {
    try {
      const Typreceptions = await typreceptionService.getAllTypreception();
      res.status(201).json(Typreceptions);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneTypreception(req, res) {
    try {
      const {id} = req.params;
      const Typreceptions = await typreceptionService.getOneTypreception(id);
      if(Typreceptions)
      {
        res.status(201).json(Typreceptions);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeTypreception(req, res) {
    try {
      const {id} = req.params;
      const count = await typreceptionService.removeTypreception(id);
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

  async updateTypreception(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Typreceptions = await typreceptionService.updateTypreception(id,changes);
      if(Typreceptions)
      {
        res.status(201).json(Typreceptions);
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

module.exports = new TypreceptionController();