const OrdrerepriseDAO = require('../dao/ordrereprise');

class OrdrerepriseService {
    createOrdrerep(OrdreservDto) {
    const { marche_id,ref,date_notif,date_reprise,ordre } = OrdreservDto;
    return OrdrerepriseDAO.createOrdrerep(marche_id,ref,date_notif,date_reprise,ordre);
  };
  getAllOrdrerep() {
    return OrdrerepriseDAO.getAllOrdrerep();
  };
  getOneOrdrerep(id) {
    return OrdrerepriseDAO.getOneOrdrerep(id);
  };
  removeOrdrerep(id) {
    return OrdrerepriseDAO.removeOrdrerep(id);
  };
  updateOrdrerep(id,changes) {
    return OrdrerepriseDAO.updateOrdrerep(id,changes);
  };

  findOrdrerep(marche_id){
      return OrdrerepriseDAO.findOrdrerep(marche_id)
  }
  
}

module.exports = new OrdrerepriseService();