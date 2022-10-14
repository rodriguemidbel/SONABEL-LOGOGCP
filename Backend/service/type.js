const typeDAO = require('../dao/type');

class TypeService {
  createType(TypeDto) {
    const { libelle } = TypeDto;
    return typeDAO.createType(libelle);
  };
  getAllType() {
    return typeDAO.getAllType();
  };
  getOneType(id) {
    return typeDAO.getOneType(id);
  };
  removeType(id) {
    return typeDAO.removeType(id);
  };
  updateType(id,changes) {
    return typeDAO.updateType(id,changes);
  };
  
}

module.exports = new TypeService();