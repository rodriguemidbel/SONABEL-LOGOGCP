const ordreservDAO = require('../dao/ordreserv');

class OrdreservService {
  createOrdreserv(OrdreservDto) {
    const { marche_id,ref,date_notif,date_debut,ordre } = OrdreservDto;
    return ordreservDAO.createOrdreserv(marche_id,ref,date_notif,date_debut,ordre);
  };
  getAllOrdreserv() {
    return ordreservDAO.getAllOrdreserv();
  };
  getOneOrdreserv(id) {
    return ordreservDAO.getOneOrdreserv(id);
  };
  removeOrdreserv(id) {
    return ordreservDAO.removeOrdreserv(id);
  };
  updateOrdreserv(id,changes) {
    return ordreservDAO.updateOrdreserv(id,changes);
  };

  findOrdreserv(marche_id){
      return ordreservDAO.findOrdreserv(marche_id)
  }
  
}

module.exports = new OrdreservService();