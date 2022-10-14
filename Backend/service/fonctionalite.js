const fonctionaliteDAO = require('../dao/fonctionalite');

class FonctionaliteService {
  createFonctionalite(FonctionaliteDto) {
    const { libelle,description } = FonctionaliteDto;
    return fonctionaliteDAO.createFonctionalite(libelle,description);
  };

  createMultipleFonctionalite(data) {
    return fonctionaliteDAO.createFonctionalite(data);
  };


  getAllFonctionalite() {
    return fonctionaliteDAO.getAllFonctionalite();
  };
  getOneFonctionalite(id) {
    return fonctionaliteDAO.getOneFonctionalite(id);
  };
  removeFonctionalite(id) {
    return fonctionaliteDAO.removeFonctionalite(id);
  };
  updateFonctionalite(id,changes) {
    return fonctionaliteDAO.updateFonctionalite(id,changes);
  };
  
}

module.exports = new FonctionaliteService();