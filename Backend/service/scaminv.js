const scaminvDAO = require('../dao/scaminv');

class scaminvService {
  createScaminv(ScaminvDto) {
    const { dossier_id,date_scam,heure_scam,lieu_scam,membre_scam,president_sct,distinc_presi_sct,ampliation } = ScaminvDto;
    return scaminvDAO.createScaminv(dossier_id,date_scam,heure_scam,lieu_scam,membre_scam,president_sct,distinc_presi_sct,ampliation);
  };
  getAllScaminv(dossier_id) {
    return scaminvDAO.getAllScaminv(dossier_id);
  };
  getOneScaminv(id) {
    return scaminvDAO.getOneScaminv(id);
  };
  removeScaminv(id) {
    return scaminvDAO.removeScaminv(id);
  };
  updateScaminv(id,changes) {
    return scaminvDAO.updateScaminv(id,changes);
  };

  findScaminv(dossier_id){
      return scaminvDAO.findScaminv(dossier_id)
  }
  
}

module.exports = new scaminvService();