const paiementDAO = require('../dao/paiement');

class paiementService {
  createPaiement(PaiementDto) {
    const { marche_id,num_facture,date_facture, montant_cfa,montant_devise,devise,taux_exe_phy,taux_exe_fin,observation,fichier } = PaiementDto;
    return paiementDAO.createPaiement(marche_id,num_facture,date_facture, montant_cfa,montant_devise,devise,taux_exe_phy,taux_exe_fin,observation,fichier);
  };
  getAllPaiement() {
    return paiementDAO.getAllPaiement();
  };
  getOnePaiement(id) {
    return paiementDAO.getOnePaiement(id);
  };
  removePaiement(id) {
    return paiementDAO.removePaiement(id);
  };
  updatePaiement(id,changes) {
    return paiementDAO.updatePaiement(id,changes);
  };

  findPaiement(marche_id){
      return paiementDAO.findPaiement(marche_id)
  }
  
}

module.exports = new paiementService();