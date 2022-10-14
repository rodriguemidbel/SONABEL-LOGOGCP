const userService = require('../service/user');

const { genSaltSync,hashSync,compareSync } = require("bcrypt");

const { sign} = require("jsonwebtoken");

class UserController {
  async createUser(req, res) {
    try {
     const body = req.body;
     //const salt = genSaltSync(10);
     //body.password = hashSync(body.password, salt);

      const id = await userService.createUser(body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllUser(req, res) {
    try {
      const groups = await userService.getAllUser();
      res.status(201).json(groups);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneUser(req, res) {
    try {
      const {id} = req.params;
      const groups = await userService.getOneUser(id);
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
  async removeUser(req, res) {
    try {
      const {id} = req.params;
      const count = await userService.removeUser(id);
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

  async updateUser(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const groups = await userService.updateUser(id,changes);
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

  async findGroupUser(req, res) {
    try {
      const {usergroup_id} = req.params;
      const user = await userService.findGroupUser(usergroup_id);
      if(user)
      {
        res.status(201).json(user);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

 
  async login(req, res) {
    try
    {
      const { username } = req.body;
      const { password } = req.body;
      const user = await userService.login(username,password);
      if(user)
      {
        //const result = compareSync( password, user.password );
        /*user.password = undefined;
        const jsontoken = sign({user : user},process.env.JWT_KEY,{
          expiresIn : "1h"
        });*/
        // token: jsontoken
        res.status(201).json({user: user});
      }
      else
      {
        res.status(404).json({message: 'This username and/or password  not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
 
  }
}
module.exports = new UserController();