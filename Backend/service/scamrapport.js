const scamrapportDAO = require('../dao/scamrapport');

class scamrapportService {
  createScamrapport(scamrapportDto) {
    const { dossier_id,date_scam_rap,rapport_scam } = scamrapportDto;
    return scamrapportDAO.createScamrapport(dossier_id,date_scam_rap,rapport_scam);
  };
  getAllScamrapport(dossier_id) {
    return scamrapportDAO.getAllScamrapport(dossier_id);
  };
  getOneScamrapport(id) {
    return scamrapportDAO.getOneScamrapport(id);
  };
  removeScamrapport(id) {
    return scamrapportDAO.removeScamrapport(id);
  };
  updateScamrapport(id,changes) {
    return scamrapportDAO.updateScamrapport(id,changes);
  };

  findScamrapport(dossier_id){
      return scamrapportDAO.findScamrapport(dossier_id)
  }
  
}

module.exports = new scamrapportService();