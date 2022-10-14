const privilegeService = require('../service/privilege');

class PrivilegeController {
  async createPrivilege(req, res) {
    try {
      const id = await privilegeService.createPrivilege(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllPrivilege(req, res) {
    try {
      const Privileges = await privilegeService.getAllPrivilege();
      res.status(201).json(Privileges);
    } catch (err) {
      console.error(err);
    }
  };

  async getOnePrivilege(req, res) {
    try {
      const {id} = req.params;
      const Privileges = await privilegeService.getOnePrivilege(id);
      if(Privileges)
      {
        res.status(201).json(Privileges);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePrivilege(req, res) {
    try {
      const {id} = req.params;
      const count = await privilegeService.removePrivilege(id);
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

  async updatePrivilege(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Privileges = await privilegeService.updatePrivilege(id,changes);
      if(Privileges)
      {
        res.status(201).json(Privileges);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async recherche(req, res) {
    try {
      const {usergroup_id,fonctionalite_id} = req.params;
      const item = await privilegeService.recherche(usergroup_id,fonctionalite_id);
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

module.exports = new PrivilegeController();