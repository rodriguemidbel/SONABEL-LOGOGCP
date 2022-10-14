const pubresultatDAO = require('../dao/pubresultats');

class pubresultatService {
  createPubresultat(PubresultatDto) {
    const { dossier_id,num_bordereau,date_bordereau } = PubresultatDto;
    return pubresultatDAO.createPubresultat(dossier_id,num_bordereau,date_bordereau);
  };
  getAllPubresultat() {
    return pubresultatDAO.getAllPubresultat();
  };
  getOnePubresultat(id) {
    return pubresultatDAO.getOnePubresultat(id);
  };
  removePubresultat(id) {
    return pubresultatDAO.removePubresultat(id);
  };
  updatePubresultat(id,changes) {
    return pubresultatDAO.updatePubresultat(id,changes);
  };

  findPubresultat(dossier_id){
      return pubresultatDAO.findPubresultat(dossier_id)
  }
  
}

module.exports = new pubresultatService();