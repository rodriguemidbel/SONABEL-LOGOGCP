const logService = require('../service/log');

class LogController {
  async createLog(req, res) {
    try {
      const id = await logService.createLog(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

  async getAllLog(req, res) {
    try {
      const Logs = await logService.getAllLog();
      res.status(201).json(Logs);
    } catch (err) {
      console.error(err);
    }
  };

  async findLog(req, res) {
    try {
      const Logs = await logService.findLog();
      res.status(201).json(Logs);
    } catch (err) {
      console.error(err);
    }
  };
  
  async getOneLog(req, res) {
    try {
      const {id} = req.params;
      const Logs = await logService.getOneLog(id);
      if(Logs)
      {
        res.status(201).json(Logs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeLog(req, res) {
    try {
      const {id} = req.params;
      const count = await logService.removeLog(id);
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

  async updateLog(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Logs = await logService.updateLog(id,changes);
      if(Logs)
      {
        res.status(201).json(Logs);
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

module.exports = new LogController();