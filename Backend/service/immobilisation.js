const immobilisationDAO = require('../dao/immobilisation');

class immobilisationService {
    
  createImmobilisation(ImmobilisationDto) {
    const { libelle } = ImmobilisationDto;
    return immobilisationDAO.createImmobilisation(libelle);
  };

  getAllImmobilisation() {
    return immobilisationDAO.getAllImmobilisation();
  };
  getOneImmobilisation(id) {
    return immobilisationDAO.getOneImmobilisation(id);
  };
  removeImmobilisation(id) {
    return immobilisationDAO.removeImmobilisation(id);
  };
  updateImmobilisation(id,changes) {
    return immobilisationDAO.updateImmobilisation(id,changes);
  };
  
}

module.exports = new immobilisationService();