const siteService = require('../service/site');

class SiteController {
  async createSite(req, res) {
    try {
      const id = await siteService.createSite(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };
  async getAllSite(req, res) {
    try {
      //const {dossier_id} = req.params;
      const Sites = await siteService.getAllSite();
      res.status(201).json(Sites);
    } catch (err) {
      console.error(err);
    }
  };
  async getOneSite(req, res) {
    try {
      const {id} = req.params;
      const Sites = await siteService.getOneSite(id);
      if(Sites)
      {
        res.status(201).json(Sites);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removeSite(req, res) {
    try {
      const {id} = req.params;
      const count = await siteService.removeSite(id);
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

  async updateSite(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Sites = await siteService.updateSite(id,changes);
      if(Sites)
      {
        res.status(201).json(Sites);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async findSite(req, res) {
    try {
      const {marche_id} = req.params;
      const item = await siteService.findSite(marche_id);
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

module.exports = new SiteController();