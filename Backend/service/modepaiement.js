const ModepaieDAO = require('../dao/modepaiement');

class ModepaieService {
  createModepaie(ModepaieDto) {
    const { libelle } = ModepaieDto;
    return ModepaieDAO.createModepaie(libelle);
  };
  getAllModepaie() {
    return ModepaieDAO.getAllModepaie();
  };
  getOneModepaie(id) {
    return ModepaieDAO.getOneModepaie(id);
  };
  removeModepaie(id) {
    return ModepaieDAO.removeModepaie(id);
  };
  updateModepaie(id,changes) {
    return ModepaieDAO.updateModepaie(id,changes);
  };
  
}

module.exports = new ModepaieService();