const DossiertechDAO = require('../dao/dossiertech');

class DossiertechService {
  createDossiertech(DossiertechDto) {
    const { planitem_id,date_tech_reel,service,dossiertech } = DossiertechDto;
    return DossiertechDAO.createDossiertech(planitem_id,date_tech_reel,service,dossiertech);
  };
  getAllDossiertech() {
    return DossiertechDAO.getAllDossiertech();
  };
  getOneDossiertech(id) {
    return DossiertechDAO.getOneDossiertech(id);
  };
  removeDossiertech(id) {
    return DossiertechDAO.removeDossiertech(id);
  };
  updateDossiertech(id,changes) {
    return DossiertechDAO.updateDossiertech(id,changes);
  };

  findDossiertech(annee){
      return DossiertechDAO.findDossiertech(annee)
  }
  
}

module.exports = new DossiertechService();