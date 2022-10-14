const typreceptionDAO = require('../dao/typreception');

class TypreceptionService {
  createTypreception(TypreceptDto) {
    const { libelle } = TypreceptDto;
    return typreceptionDAO.createTypreception(libelle);
  };

  
  getAllTypreception() {
    return typreceptionDAO.getAllTypreception();
  };
  getOneTypreception(id) {
    return typreceptionDAO.getOneTypreception(id);
  };
  removeTypreception(id) {
    return typreceptionDAO.removeTypreception(id);
  };
  updateTypreception(id,changes) {
    return typreceptionDAO.updateTypreception(id,changes);
  };
  
}

module.exports = new TypreceptionService();