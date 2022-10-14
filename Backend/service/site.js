const siteDAO = require('../dao/site');

class siteService {
  createSite(SiteDto) {
    const { marche_id,date_rem_site } = SiteDto;
    return siteDAO.createSite(marche_id,date_rem_site);
  };
  getAllSite() {
    return siteDAO.getAllSite();
  };
  getOneSite(id) {
    return siteDAO.getOneSite(id);
  };
  removeSite(id) {
    return siteDAO.removeSite(id);
  };
  updateSite(id,changes) {
    return siteDAO.updateSite(id,changes);
  };

  findSite(marche_id){
      return siteDAO.findSite(marche_id)
  }
  
}

module.exports = new siteService();