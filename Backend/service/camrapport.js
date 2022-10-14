const camrapportDAO = require('../dao/camrapport');

class camrapportService {
  createCamrapport(camrapportDto) {
    const { dossier_id,date_cam_rap,rapport_cam } = camrapportDto;
    return camrapportDAO.createCamrapport(dossier_id,date_cam_rap,rapport_cam);
  };
  getAllCamrapport(dossier_id) {
    return camrapportDAO.getAllCamrapport(dossier_id);
  };
  getOneCamrapport(id) {
    return camrapportDAO.getOneCamrapport(id);
  };
  removeCamrapport(id) {
    return camrapportDAO.removeCamrapport(id);
  };
  updateCamrapport(id,changes) {
    return camrapportDAO.updateCamrapport(id,changes);
  };

  findCamrapport(dossier_id){
      return camrapportDAO.findCamrapport(dossier_id)
  }
  
}

module.exports = new camrapportService();