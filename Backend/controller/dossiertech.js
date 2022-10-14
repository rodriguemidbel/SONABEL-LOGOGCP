const dossiertechService = require('../service/dossiertech');


class DossiertechController {

  async createDossiertech(req, res) {
    try {
      const id = await dossiertechService.createDossiertech(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
   
  };
  async getAllDossiertech(req, res) {
    try {
      const Dossiertechs = await dossiertechService.getAllDossiertech();
      res.status(201).json(Dossiertechs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneDossiertech(req, res) {
    try {
      const {id} = req.params;
      const Dossiertechs = await dossiertechService.getOneDossiertech(id);
      if(Dossiertechs)
      {
        res.status(201).json(Dossiertechs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeDossiertech(req, res) {
    try {
      const {id} = req.params;
      const count = await dossiertechService.removeDossiertech(id);
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

  async updateDossiertech(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Dossiertechs = await dossiertechService.updateDossiertech(id,changes);
      if(Dossiertechs)
      {
        res.status(201).json(Dossiertechs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findDossiertech(req, res) {
    try {
      const {annee} = req.params;
      const item = await dossiertechService.findDossiertech(annee);
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
  /*---------------------------*/
  

  
}

module.exports = new DossiertechController();