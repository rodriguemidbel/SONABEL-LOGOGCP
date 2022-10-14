const proceverbService = require('../service/proceverb');

class ProceverbController {
  async createProceverb(req, res) {
    try {
      const id = await proceverbService.createProceverb(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllProceverb(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Proceverbs = await proceverbService.getAllProceverb();
      res.status(201).json(Proceverbs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneProceverb(req, res) {
    try {
      const {id} = req.params;
      const Proceverbs = await proceverbService.getOneProceverb(id);
      if(Proceverbs)
      {
        res.status(201).json(Proceverbs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeProceverb(req, res) {
    try {
      const {id} = req.params;
      const count = await proceverbService.removeProceverb(id);
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

  async updateProceverb(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Proceverbs = await proceverbService.updateProceverb(id,changes);
      if(Proceverbs)
      {
        res.status(201).json(Proceverbs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findProceverb(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await proceverbService.findProceverb(dossier_id);
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

module.exports = new ProceverbController();