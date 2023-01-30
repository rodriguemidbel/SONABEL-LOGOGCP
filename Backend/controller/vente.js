const venteService = require('../service/vente');

class VenteController {
  async createVente(req, res) {
    try {
      const id = await venteService.createVente(req.body);
      res.status(201).json({venteID : id});
    } catch (err) {
      console.error(err);
    }
  };
  async getAllVente(req, res) {
    try {
      const Ventes = await venteService.getAllVente();
      res.status(201).json(Ventes);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneVente(req, res) {
    try {
      const {id} = req.params;
      const Ventes = await venteService.getOneVente(id);
      if(Ventes)
      {
        res.status(201).json(Ventes);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeVente(req, res) {
    try {
      const {id} = req.params;
      const count = await venteService.removeVente(id);
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

  async updateVente(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Ventes = await venteService.updateVente(id,changes);
      if(Ventes)
      {
        res.status(201).json(Ventes);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findVente(req, res) {
    try {
      const {dossier_id} = req.params;
      const item = await venteService.findVente(dossier_id);
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

  async findFrsVente(req, res) {
    try {
      const {lot_id} = req.params;
      const item = await venteService.findFrsVente(lot_id);
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

  async findVenteID(req, res) {
    try {
      const {lot_id,fournisseur_id} = req.params;
      const item = await venteService.findVenteID(lot_id,fournisseur_id);
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

  async countVentes(req, res) {
    try {
      const {annee} = req.params;
      const item = await venteService.countVentes(annee);
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

module.exports = new VenteController();