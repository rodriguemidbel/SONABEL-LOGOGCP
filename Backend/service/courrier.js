const courrierDAO = require('../dao/courrier');

class courrierService {
  createCourrier(CourrierDto) {
    const { dossier_id,objet,date_courrier,fichier } = CourrierDto;
    return courrierDAO.createCourrier(dossier_id,objet,date_courrier,fichier);
  };
  getAllCourrier(dossier_id) {
    return courrierDAO.getAllCourrier(dossier_id);
  };
  getOneCourrier(id) {
    return courrierDAO.getOneCourrier(id);
  };
  removeCourrier(id) {
    return courrierDAO.removeCourrier(id);
  };
  updateCourrier(id,changes) {
    return courrierDAO.updateCourrier(id,changes);
  };

  findCourrier(dossier_id){
      return courrierDAO.findCourrier(dossier_id)
  }
  
}

module.exports = new courrierService();