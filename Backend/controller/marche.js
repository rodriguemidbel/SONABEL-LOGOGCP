const marcheService = require('../service/marche');

class MarcheController {
  async createMarche(req, res) {
    try {
      const id = await marcheService.createMarche(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllMarche(req, res) {
    try {
      //const {} = req.params;
      const Marches = await marcheService.getAllMarche();
      res.status(201).json(Marches);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneMarche(req, res) {
    try {
      const {id} = req.params;
      const Marches = await marcheService.getOneMarche(id);
      if(Marches)
      {
        res.status(201).json(Marches);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeMarche(req, res) {
    try {
      const {id} = req.params;
      const count = await marcheService.removeMarche(id);
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

  async updateMarche(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Marches = await marcheService.updateMarche(id,changes);
      if(Marches)
      {
        res.status(201).json(Marches);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findMarche(req, res) {
    try {
      const {mar_doss_id} = req.params;
      const item = await marcheService.findMarche(mar_doss_id);
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

  async getMarche(req, res) {
    try {
      //const {dossier_id} = req.params;
      const item = await marcheService.getMarche();
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

  async nbrPassMarche(req, res) {
    try {
      const {annee} = req.params;
      const item = await marcheService.nbrPassMarche(annee);
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

module.exports = new MarcheController();