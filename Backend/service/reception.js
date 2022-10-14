const receptionDAO = require('../dao/reception');

class ReceptionService {
  createReception(TypreceptDto) {
    const { marche_id,typreception_id,date_recept,heure_recept,membre,autre,pv_recept } = TypreceptDto;
    return receptionDAO.createReception(marche_id,typreception_id,date_recept,heure_recept,membre,autre,pv_recept);
  };

  
  getAllReception() {
    return receptionDAO.getAllReception();
  };
  getOneReception(id) {
    return receptionDAO.getOneReception(id);
  };
  removeReception(id) {
    return receptionDAO.removeReception(id);
  };
  updateReception(id,changes) {
    return receptionDAO.updateReception(id,changes);
  };
  
}

module.exports = new ReceptionService();