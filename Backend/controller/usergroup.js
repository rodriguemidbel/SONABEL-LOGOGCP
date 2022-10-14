const usergroupService = require('../service/usergroup');

class UsergroupController {
  async createUsergroup(req, res) {
    try {
      const id = await usergroupService.createUsergroup(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllUsergroup(req, res) {
    try {
      const groups = await usergroupService.getAllUsergroup();
      res.status(201).json(groups);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneUsergroup(req, res) {
    try {
      const {id} = req.params;
      const groups = await usergroupService.getOneUsergroup(id);
      if(groups)
      {
        res.status(201).json(groups);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeUsergroup(req, res) {
    try {
      const {id} = req.params;
      const count = await usergroupService.removeUsergroup(id);
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

  async updateUsergroup(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const groups = await usergroupService.updateUsergroup(id,changes);
      if(groups)
      {
        res.status(201).json(groups);
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

module.exports = new UsergroupController();
