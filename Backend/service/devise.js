const deviseDAO = require('../dao/devise');

class DeviseService {
  createDevise(DeviseDto) {
    const { libelle,symbole } = DeviseDto;
    return deviseDAO.createDevise(libelle,symbole);
  };

  getAllDevise() {
    return deviseDAO.getAllDevise();
  };
  getOneDevise(id) {
    return deviseDAO.getOneDevise(id);
  };
  removeDevise(id) {
    return deviseDAO.removeDevise(id);
  };
  updateDevise(id,changes) {
    return deviseDAO.updateDevise(id,changes);
  };
  
}

module.exports = new DeviseService();