const aviDAO = require('../dao/avi');

class aviService {
  createAvi(aviDto) {
    const { dossier_id,date_envoi,date_publi,num_publi,fichier } = aviDto;
    return aviDAO.createAvi(dossier_id,date_envoi,date_publi,num_publi,fichier);
  };
  getAllAvi(dossier_id) {
    return aviDAO.getAllAvi(dossier_id);
  };
  getOneAvi(id) {
    return aviDAO.getOneAvi(id);
  };
  removeAvi(id) {
    return aviDAO.removeAvi(id);
  };
  updateAvi(id,changes) {
    return aviDAO.updateAvi(id,changes);
  };

  findAvi(dossier_id){
      return aviDAO.findAvi(dossier_id)
  }
  
}

module.exports = new aviService();