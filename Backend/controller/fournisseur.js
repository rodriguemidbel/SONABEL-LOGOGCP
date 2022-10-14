const fournisseurService = require('../service/fournisseur');

class FournisseurController {
  async createFournisseur(req, res) {
    try {
      const id = await fournisseurService.createFournisseur(req.body);
      res.status(201).json({groupementID :id});
    } catch (err) {
      console.error(err);
    }
  };
  async getAllFournisseur(req, res) {
    try {
      const Fournisseurs = await fournisseurService.getAllFournisseur();
      res.status(201).json(Fournisseurs);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneFournisseur(req, res) {
    try {
      const {id} = req.params;
      const Fournisseurs = await fournisseurService.getOneFournisseur(id);
      if(Fournisseurs)
      {
        res.status(201).json(Fournisseurs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeFournisseur(req, res) {
    try {
      const {id} = req.params;
      const count = await fournisseurService.removeFournisseur(id);
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

  async updateFournisseur(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Fournisseurs = await fournisseurService.updateFournisseur(id,changes);
      if(Fournisseurs)
      {
        res.status(201).json(Fournisseurs);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findFournisseur(req, res) {
    try {
      const {annee} = req.params;
      const item = await fournisseurService.findFournisseur(annee);
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

module.exports = new FournisseurController();