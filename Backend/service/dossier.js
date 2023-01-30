const dossierDAO = require('../dao/dossier');

class dossierService {
  createDossier(DossierDto) {
    const { planitem_id,numero_doss,intitule_doss,date_trans_sign,date_retour_sign,
      date_trans_dgcmef,taux_reception,niveau_traitement,taux_avencement,dossier,statut } = DossierDto;
    return dossierDAO.createDossier(planitem_id,numero_doss,intitule_doss,date_trans_sign,date_retour_sign,
      date_trans_dgcmef,taux_reception,niveau_traitement,taux_avencement,dossier,statut);
  };
  getAllDossier() {
    return dossierDAO.getAllDossier();
  };
  getOneDossier(id) {
    return dossierDAO.getOneDossier(id);
  };
  removeDossier(id) {
    return dossierDAO.removeDossier(id);
  };
  updateDossier(id,changes) {
    return dossierDAO.updateDossier(id,changes);
  };

  findDossier(annee){
      return dossierDAO.findDossier(annee)
  }

  findDossierByAgent(agent_id,annee){
    return dossierDAO.findDossierByAgent(agent_id,annee)
  }

  

getDossier(){
    return dossierDAO.getDossier()
}

dossierByMode(annee){
  return dossierDAO.dossierByMode(annee)
}
  
}

module.exports = new dossierService();