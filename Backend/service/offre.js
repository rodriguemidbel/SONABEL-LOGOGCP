const offreDAO = require('../dao/offre');

class offreService {
  createOffre(OffreDto) {
    const { off_doss_id,lot_id,entreprise_cons,date_depot,heure_depot,nom_prenom_dep,
      telephone_dep,montant_offre,montant_corrige } = OffreDto;
    return offreDAO.createOffre(off_doss_id,lot_id,entreprise_cons,date_depot,heure_depot,nom_prenom_dep,
      telephone_dep,montant_offre,montant_corrige);
  };
  getAllOffre(off_doss_id) {
    return offreDAO.getAllOffre(off_doss_id);
  };
  getOneOffre(id) {
    return offreDAO.getOneOffre(id);
  };
  removeOffre(id) {
    return offreDAO.removeOffre(id);
  };
  updateOffre(id,changes) {
    return offreDAO.updateOffre(id,changes);
  };

  findOffre(off_doss_id){
      return offreDAO.findOffre(off_doss_id)
  }
  
}

module.exports = new offreService();