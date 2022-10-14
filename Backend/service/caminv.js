const caminvDAO = require('../dao/caminv');

class caminvService {
  createCaminv(CaminvDto) {
    const { dossier_id,date_cam,heure_cam,lieu_cam,membre_cam,president_cam,distinc_presi_cam,ampliation } = CaminvDto;
    return caminvDAO.createCaminv(dossier_id,date_cam,heure_cam,lieu_cam,membre_cam,president_cam,distinc_presi_cam,ampliation);
  };
  getAllCaminv(dossier_id) {
    return caminvDAO.getAllCaminv(dossier_id);
  };
  getOneCaminv(id) {
    return caminvDAO.getOneCaminv(id);
  };
  removeCaminv(id) {
    return caminvDAO.removeCaminv(id);
  };
  updateCaminv(id,changes) {
    return caminvDAO.updateCaminv(id,changes);
  };

  findCaminv(dossier_id){
      return caminvDAO.findCaminv(dossier_id)
  }
  
}

module.exports = new caminvService();