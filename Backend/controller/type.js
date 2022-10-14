const typeService = require('../service/type');

class TypeController {
  async createType(req, res) {
    try {
      const id = await typeService.createType(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllType(req, res) {
    try {
      const Types = await typeService.getAllType();
      res.status(201).json(Types);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneType(req, res) {
    try {
      const {id} = req.params;
      const Types = await typeService.getOneType(id);
      if(Types)
      {
        res.status(201).json(Types);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeType(req, res) {
    try {
      const {id} = req.params;
      const count = await typeService.removeType(id);
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

  async updateType(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Types = await typeService.updateType(id,changes);
      if(Types)
      {
        res.status(201).json(Types);
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

module.exports = new TypeController();