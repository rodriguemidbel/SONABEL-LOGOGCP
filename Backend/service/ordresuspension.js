const OrdresusDAO = require('../dao/ordresuspension');

class OrdresuspensionService {
    createOrdresus(OrdresusDto) {
    const { marche_id,ref,date_notif,date_suspension,ordre } = OrdresusDto;
    return OrdresusDAO.createOrdresus(marche_id,ref,date_notif,date_suspension,ordre);
  };
  getAllOrdresus() {
    return OrdresusDAO.getAllOrdresus();
  };
  getOneOrdresus(id) {
    return OrdresusDAO.getOneOrdresus(id);
  };
  removeOrdresus(id) {
    return OrdresusDAO.removeOrdresus(id);
  };
  updateOrdresus(id,changes) {
    return OrdresusDAO.updateOrdresus(id,changes);
  };

  findOrdresus(marche_id){
      return OrdresusDAO.findOrdresus(marche_id)
  }
  
}

module.exports = new OrdresuspensionService();