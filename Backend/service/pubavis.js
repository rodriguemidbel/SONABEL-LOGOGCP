const pubavisDAO = require('../dao/pubavis');

class pubavisService {
  createPubavis(pubavisDto) {
    const { dossier_id,date_bordereau,fichier,observation } = pubavisDto;
    return pubavisDAO.createPubavis(dossier_id,date_bordereau,fichier,observation);
  };
  getAllPubavis() {
    return pubavisDAO.getAllPubavis();
  };
  getOnePubavis(id) {
    return pubavisDAO.getOnePubavis(id);
  };
  removePubavis(id) {
    return pubavisDAO.removePubavis(id);
  };
  updatePubavis(id,changes) {
    return pubavisDAO.updatePubavis(id,changes);
  };

  findPubavis(dossier_id){
      return pubavisDAO.findPubavis(dossier_id)
  }
  
}

module.exports = new pubavisService();