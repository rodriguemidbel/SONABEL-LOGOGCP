const cautionService = require('../service/caution');

class CautionController {
  async createCaution(req, res) {
    try {
      const id = await cautionService.createCaution(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllCaution(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Cautions = await cautionService.getAllCaution();
      res.status(201).json(Cautions);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneCaution(req, res) {
    try {
      const {id} = req.params;
      const Cautions = await cautionService.getOneCaution(id);
      if(Cautions)
      {
        res.status(201).json(Cautions);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeCaution(req, res) {
    try {
      const {id} = req.params;
      const count = await cautionService.removeCaution(id);
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

  async updateCaution(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Cautions = await cautionService.updateCaution(id,changes);
      if(Cautions)
      {
        res.status(201).json(Cautions);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findCaution(req, res) {
    try {
      const {cau_doss_id} = req.params;
      const item = await cautionService.findCaution(cau_doss_id);
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

module.exports = new CautionController();