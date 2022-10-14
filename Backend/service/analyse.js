const analyseDAO = require('../dao/analyse');

class analyseService {
  createAnalyse(analyseDto) {
    const { dossier_id,date_convocation,date_effec_ana,date_trans_dgcmef,observation,rapport } = analyseDto;
    return analyseDAO.createAnalyse(dossier_id,date_convocation,date_effec_ana,date_trans_dgcmef,observation,rapport);
  };
  getAllAnalyse(dossier_id) {
    return analyseDAO.getAllAnalyse(dossier_id);
  };
  getOneAnalyse(id) {
    return analyseDAO.getOneAnalyse(id);
  };
  removeAnalyse(id) {
    return analyseDAO.removeAnalyse(id);
  };
  updateAnalyse(id,changes) {
    return analyseDAO.updateAnalyse(id,changes);
  };

  findAnalyse(dossier_id){
      return analyseDAO.findAnalyse(dossier_id)
  }
  
}

module.exports = new analyseService();