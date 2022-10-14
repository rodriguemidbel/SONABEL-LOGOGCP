const resultatDAO = require('../dao/resultat');

class resultatService {
  createResultat(ResultatDto) {
    const { dossier_id,date_par_res,num_par_res,attributaire,litige,fichierpub,fichierlitige } = ResultatDto;
    return resultatDAO.createResultat(dossier_id,date_par_res,num_par_res,attributaire,litige,fichierpub,fichierlitige);
  };
  getAllResultat(dossier_id) {
    return resultatDAO.getAllResultat(dossier_id);
  };
  getOneResultat(id) {
    return resultatDAO.getOneResultat(id);
  };
  removeResultat(id) {
    return resultatDAO.removeResultat(id);
  };
  updateResultat(id,changes) {
    return resultatDAO.updateResultat(id,changes);
  };

  findResultat(dossier_id){
      return resultatDAO.findResultat(dossier_id)
  }
  
}

module.exports = new resultatService();